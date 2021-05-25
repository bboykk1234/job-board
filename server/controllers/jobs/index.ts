import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { difference, intersection, uniq } from "lodash";
import { createQueryBuilder, IsNull } from "typeorm";
import { ListJobsCategorizedByJobFunctionResponseSchema } from "../../../@types";
import { EmploymentType } from "../../database/models/EmploymentType";
import { Job } from "../../database/models/Job";
import { JobApplication } from "../../database/models/JobApplication";
import { JobFunction } from "../../database/models/JobFunction";
import { JobSkill } from "../../database/models/JobSkill";
import { Level } from "../../database/models/Level";
import { Skill } from "../../database/models/Skill";
import { User } from "../../database/models/User";
import { SaveJobRequestSchema } from "../../requests/jobs";

export const get = async (req: Request, res: Response) => {
    const job = await Job.createQueryBuilder()
        .innerJoinAndSelect(`${Job.name}.creator`, User.name)
        .innerJoinAndSelect(`${Job.name}.jobFunction`, JobFunction.name)
        .innerJoinAndSelect(`${Job.name}.employmentType`, EmploymentType.name)
        .innerJoinAndSelect(`${Job.name}.level`, Level.name)
        .addSelect(`${Job.name}.description`)
        .where({ id: req.params.id, closedAt: IsNull() })
        .getOne();

    if (!job) {
        res.status(404).json({
            message: "Job not found",
        });
        return;
    }

    job.jobSkillPivot = await createQueryBuilder()
        .relation(Job, "jobSkillPivot")
        .of(job)
        .loadMany();

    const skillIds = job.jobSkillPivot.map(jobSkill => jobSkill.skillId);
    const skills = await Skill.findByIds(skillIds);
    job.skills = skills;

    delete job.jobSkillPivot;

    res.json(job);
};

export const getApplications = async (req: Request, res: Response) => {
    const jobApplications = await JobApplication.find({
        where: {
            jobId: parseInt(req.params.id)
        },
        relations: [
            "job",
            "job.jobSkillPivot"
        ]
    });

    for (const jobApplication of jobApplications) {
        if (!jobApplication.job) {
            continue;
        }
        const skillIds = jobApplication.job.jobSkillPivot?.map(jobSkill => jobSkill.skillId) || [];
        const skills = await Skill.findByIds(skillIds);
        jobApplication.job.skills = skills;
        delete jobApplication.job.jobSkillPivot;
    }

    res.json(jobApplications);
}

export const list = async (req: Request, res: Response) => {
    const { group_by: groupBy } = req.query;
    const jobs = await Job.find({
        select: [
            "id",
            "title",
            "creatorId",
            "location",
            "jobFunctionId",
            "employmentTypeId",
            "levelId",
        ],
        relations: ["jobFunction", "creator"],
        where: {
            closedAt: IsNull(),
        }
    });


    if (groupBy == "job_function") {
        let categorizedJobs: ListJobsCategorizedByJobFunctionResponseSchema = {};
        jobs.forEach(job => {
            if (!job.jobFunction) {
                return;
            }

            if (job.jobFunction.name in categorizedJobs) {
                categorizedJobs[job.jobFunction.name].push({ ...job });
                return;
            }

            categorizedJobs[job.jobFunction.name] = [{ ...job }];
        });

        res.json(categorizedJobs);
        return;
    }

    res.json(jobs);
};

export const create = async (req: ValidatedRequest<SaveJobRequestSchema>, res: Response) => {
    const { employmentTypeId, skillIds, levelId } = req.body;
    const employmentType = await EmploymentType.findOne(employmentTypeId);

    if (!employmentType) {
        res.status(400).json({
            type: "body",
            message: "Invalid employment type selected.",
        });
        return;
    }

    const level = await Level.findOne(levelId);

    if (!level) {
        res.status(400).json({
            type: "body",
            message: "Invalid level selected.",
        });
        return;
    }

    const skills = await Skill.findByIds(uniq(skillIds));

    if (skills.length === 0) {
        res.status(400).json({
            type: "body",
            message: "No skills selected.",
        });
        return;
    }

    const job = Job.populateViaPostReq(req);
    await job.save();

    for (const skill of skills) {
        const jobSkill = new JobSkill();
        jobSkill.job = job;
        jobSkill.skill = skill;
        await jobSkill.save();
    }

    res.json({
        ...job,
        skills
    });
};

export const update = async (req: ValidatedRequest<SaveJobRequestSchema>, res: Response) => {
    const job = await Job.findOne(req.params.id, {
        relations: ["jobSkillPivot"],
        where: {
            closedAt: IsNull(),
        }
    });

    if (!job) {
        res.status(404).json({
            message: "Job not found.",
        });
        return;
    }

    const { employmentTypeId, skillIds, levelId, jobFunctionId } = req.body;
    const uniqSkillIds = uniq(skillIds);
    const employmentType = await EmploymentType.findOne(employmentTypeId);

    if (!employmentType) {
        res.status(400).json({
            type: "body",
            message: "Invalid employment type selected.",
        });
        return;
    }

    const level = await Level.findOne(levelId);

    if (!level) {
        res.status(400).json({
            type: "body",
            message: "Invalid level selected.",
        });
        return;
    }

    const jobFunction = await JobFunction.findOne(jobFunctionId);

    if (!jobFunction) {
        res.status(400).json({
            type: "body",
            message: "Invalid job function selected.",
        });
        return;
    }

    job.populateViaPutReq(req);
    await job.save();

    const oldSkillIds = job.jobSkillPivot?.map(jobSkill => jobSkill.skillId) || [];
    const newSkillIds = difference(uniqSkillIds, oldSkillIds);
    const existingSkillIds = intersection(oldSkillIds, uniqSkillIds);
    const skillIdsShouldDelete = difference(oldSkillIds, uniqSkillIds);
    const newSkills = await Skill.findByIds(newSkillIds);

    if (existingSkillIds.length === 0 && newSkills.length === 0) {
        res.status(400).json({
            type: "body",
            message: "No skills selected.",
        });
        return;
    }

    for (const skill of newSkills) {
        const jobSkill = new JobSkill();
        jobSkill.job = job;
        jobSkill.skill = skill;
        await jobSkill.save();
    }

    skillIdsShouldDelete.length > 0 && await JobSkill.createQueryBuilder()
        .delete()
        .where("job_id = :jobId AND skill_id IN (:skillIds)", { jobId: job.id, skillIds: skillIdsShouldDelete })
        .execute();

    res.json({
        ...job,
        skills: newSkills
    });
};

export const close = async (req: ValidatedRequest<SaveJobRequestSchema>, res: Response) => {
    const { affected } = await Job.update(req.params.id, { closedAt: new Date });

    res.json({
        status: affected && affected >= 0,
    });
}