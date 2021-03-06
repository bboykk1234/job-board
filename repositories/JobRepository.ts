import { difference, intersection, uniq } from "lodash";
import { SaveJobRequestBody, UserResponseModel } from "../@types";
import ModelNotFoundError from "../exceptions/ModelNotFoundError";
import Company from "../models/Company";
import EmploymentType from "../models/EmploymentType";
import Job from "../models/Job";
import JobFunction from "../models/JobFunction";
import JobSkill from "../models/JobSkill";
import Level from "../models/Level";
import Skill from "../models/Skill";

export default class JobRepository {
    static async createBasedOnReqBody(user: UserResponseModel, body: SaveJobRequestBody): Promise<Job> {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    skills,
                } = await this.findRequiredModelsBasedOnReqBody(body)

                const job = await Job.transaction(async trx => {
                    const jobObj = Job.populateViaPostReqBody(body);
                    jobObj.creatorId = user.id
                    const job = await Job.query().insert(jobObj);
                    await JobSkill.knexQuery()
                        .insert(skills.map(skill => {
                            return {
                                job_id: job.id,
                                skill_id: skill.id,
                                created_at: new Date(),
                                updated_at: new Date(),
                            }
                        }))
                        .onConflict(["job_id", "skill_id"])
                        .ignore()
                    return job;
                })
                job.skills = skills

                resolve(job)
            } catch (err) {
                reject(err)
            }
        })
    }

    static async updateBasedOnReqBody(id: number, user: UserResponseModel, body: SaveJobRequestBody): Promise<Job> {
        return new Promise(async (resolve, reject) => {
            try {
                let job = await Job.query()
                    .where("id", id)
                    .whereNull("closed_at")
                    .withGraphFetched({
                        skills: true,
                    })
                    .first();

                if (!job) {
                    throw new ModelNotFoundError(404, "Job not found.")
                }

                const requiredModels = await this.findRequiredModelsBasedOnReqBody(body)

                if (!job.skills) {
                    const skills = await Job.relatedQuery("skills")
                    job.skills = skills
                }

                const { skillIds } = body;
                const uniqSkillIds = uniq(skillIds);
                const oldSkillIds = job.skills?.map(skill => skill.id) || [];
                const newSkillIds = difference(uniqSkillIds, oldSkillIds);
                const existingSkillIds = intersection(oldSkillIds, uniqSkillIds);
                const skillIdsShouldDelete = difference(oldSkillIds, uniqSkillIds);
                const newSkills = await Skill.query().findByIds(newSkillIds);

                if (existingSkillIds.length === 0 && newSkills.length === 0) {
                    throw new ModelNotFoundError(400, "No skills associated with job.")
                }

                job = await Job.transaction(async () => {
                    job.populateViaPutReqBody(body)
                    await Job.query()
                        .where("id", job.id)
                        .update(job)

                    await JobSkill.knexQuery()
                        .insert(newSkillIds.map(skillId => {
                            return {
                                job_id: job.id,
                                skill_id: skillId,
                                created_at: new Date,
                                updated_at: new Date,
                            }
                        }))
                        .onConflict(["job_id", "skill_id"])
                        .ignore()

                    let skillsWithoutDeletedSkills: Skill[] = [...(job.skills || [])]
                    if (skillIdsShouldDelete.length > 0) {
                        await JobSkill.query()
                            .where("job_id", job.id)
                            .whereIn("skill_id", skillIdsShouldDelete)
                            .delete()

                        skillsWithoutDeletedSkills = skillsWithoutDeletedSkills.filter(skill => !skillIdsShouldDelete.includes(skill.id)) || []
                    }

                    job.employmentType = requiredModels.employmentType
                    job.level = requiredModels.level
                    job.jobFunction = requiredModels.jobFunction
                    job.company = requiredModels.company
                    job.skills = [
                        ...newSkills,
                        ...skillsWithoutDeletedSkills
                    ]

                    return job
                })

                resolve(job)
            } catch (err) {
                reject(err)
            }
        })
    }

    static async findRequiredModelsBasedOnReqBody({
        companyId,
        employmentTypeId,
        skillIds,
        levelId,
        jobFunctionId,
    }: SaveJobRequestBody) {
        const employmentType = await EmploymentType.query().findById(employmentTypeId);

        if (!employmentType) {
            throw new ModelNotFoundError(400, "Invalid employment type selected.")
        }

        const level = await Level.query().findById(levelId);

        if (!level) {
            throw new ModelNotFoundError(400, "Invalid level selected.")
        }

        const skills = await Skill.query().findByIds(uniq(skillIds));

        if (skills.length === 0) {
            throw new ModelNotFoundError(400, "No skills selected.")
        }

        const jobFunction = await JobFunction.query().findById(jobFunctionId);

        if (!jobFunction) {
            throw new ModelNotFoundError(400, "Invalid job function selected.")
        }

        const company = await Company.query().findById(companyId);

        if (!company) {
            throw new ModelNotFoundError(400, "Invalid company selected.")
        }

        return {
            employmentType,
            jobFunction,
            company,
            level,
            skills,
        }
    }
}
