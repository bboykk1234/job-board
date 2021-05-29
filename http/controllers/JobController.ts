import { difference, intersection, uniq } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { NextApiRequestWithId, SaveJobRequestSchema, ValidatedAuthRequest } from "../../@types";
import Company from "../../models/Company";
import EmploymentType from "../../models/EmploymentType";
import Job from "../../models/Job";
import JobFunction from "../../models/JobFunction";
import JobSkill from "../../models/JobSkill";
import Level from "../../models/Level";
import Skill from "../../models/Skill";

export default class JobController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const jobs = await Job.query().withGraphFetched({
            jobFunction: true,
            creator: true,
        })
            .modify("selectAllExceptDesc")
            .whereNull("closed_at")
            .page(0, 25)

        res.json(jobs)
    }

    static async show(req: NextApiRequestWithId, res: NextApiResponse, next: NextHandler) {
        const job = await Job.query().where({ id: req.params.id }).withGraphFetched({
            creator: true,
            jobFunction: true,
            employmentType: true,
            level: true,
            skills: true,
            company: true,
        })
            .first()

        if (!job) {
            res.status(404).json({
                message: "Job not found",
            });
            return;
        }

        res.json(job);
    }

    static async create(req: ValidatedAuthRequest<SaveJobRequestSchema>, res: NextApiResponse, next: NextHandler) {
        const { companyId, employmentTypeId, skillIds, levelId, jobFunctionId } = req.body;
        const employmentType = await EmploymentType.query().findById(employmentTypeId);

        if (!employmentType) {
            res.status(400).json({
                type: "body",
                message: "Invalid employment type selected.",
            });
            return;
        }

        const level = await Level.query().findById(levelId);

        if (!level) {
            res.status(400).json({
                type: "body",
                message: "Invalid level selected.",
            });
            return;
        }

        const skills = await Skill.query().findByIds(uniq(skillIds));

        if (skills.length === 0) {
            res.status(400).json({
                type: "body",
                message: "No skills selected.",
            });
            return;
        }

        const jobFunction = await JobFunction.query().findById(jobFunctionId);

        if (!jobFunction) {
            res.status(400).json({
                type: "body",
                message: "Invalid job function selected.",
            });
            return;
        }

        const company = await Company.query().findById(companyId);

        if (!company) {
            res.status(400).json({
                type: "body",
                message: "Invalid company selected.",
            });
            return;
        }

        const job = await Job.transaction(async trx => {
            const jobObj = Job.populateViaPostReq(req);
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

        res.json({
            ...job,
            skills
        });
    }

    static async update(req: ValidatedAuthRequest<SaveJobRequestSchema>, res: NextApiResponse, next: NextHandler) {
        // TODO: Move somewhere else
        const job = await Job.query().where({
            id: req.params.id,
        })
            .whereNull("closed_at")
            .withGraphFetched({
                skills: true,
            })
            .first();

        if (!job) {
            res.status(404).json({
                message: "Job not found.",
            });
            return;
        }

        const { companyId, employmentTypeId, skillIds, levelId, jobFunctionId } = req.body;
        const uniqSkillIds = uniq(skillIds);
        const employmentType = await EmploymentType.query().findById(employmentTypeId);

        if (!employmentType) {
            res.status(400).json({
                type: "body",
                message: "Invalid employment type selected.",
            });
            return;
        }

        const level = await Level.query().findById(levelId);

        if (!level) {
            res.status(400).json({
                type: "body",
                message: "Invalid level selected.",
            });
            return;
        }

        const skills = await Skill.query().findByIds(uniq(skillIds));

        if (skills.length === 0) {
            res.status(400).json({
                type: "body",
                message: "No skills selected.",
            });
            return;
        }

        const jobFunction = await JobFunction.query().findById(jobFunctionId);

        if (!jobFunction) {
            res.status(400).json({
                type: "body",
                message: "Invalid job function selected.",
            });
            return;
        }

        const company = await Company.query().findById(companyId);

        if (!company) {
            res.status(400).json({
                type: "body",
                message: "Invalid company selected.",
            });
            return;
        }

        job.populateViaPutReq(req)
        await Job.query()
            .update(job)
            .where("id", job.id)

        const oldSkillIds = job.skills?.map(skill => skill.id) || [];
        const newSkillIds = difference(uniqSkillIds, oldSkillIds);
        const existingSkillIds = intersection(oldSkillIds, uniqSkillIds);
        const skillIdsShouldDelete = difference(oldSkillIds, uniqSkillIds);
        const newSkills = await Skill.query().findByIds(newSkillIds);

        if (existingSkillIds.length === 0 && newSkills.length === 0) {
            res.status(400).json({
                type: "body",
                message: "No skills selected.",
            });
            return;
        }

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
            .ignore().debug(true)

        skillIdsShouldDelete.length > 0 && await JobSkill.query()
            .delete()
            .where("jobId", job.id)
            .whereIn("skillId", skillIdsShouldDelete)

        res.json({
            ...job,
            skills
        });
    }

    static async close(req: NextApiRequestWithId, res: NextApiResponse) {
        const affected = await Job.query()
            .findById(req.params.id)
            .patch(
                { closedAt: new Date }
            )

        res.json({
            status: affected && affected >= 0,
        });
    }
}