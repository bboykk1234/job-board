import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { difference } from "lodash";
import { EmploymentType } from "../../database/models/EmploymentType";
import { Job } from "../../database/models/Job";
import { JobSkill } from "../../database/models/JobSkill";
import { Skill } from "../../database/models/Skill";
import { SaveJobRequestSchema } from "../../requests/jobs";
import keywordExtractor from "keyword-extractor";

export const get = async (req: Request, res: Response) => {
    const job = await Job.findOne(req.params.id);

    if (!job) {
        res.status(404).json({
            message: "Job not found",
        });
        return;
    }

    res.json(job);
};

export const list = async (req: Request, res: Response) => {
    const page = (req.query.page || 1) as number;
    const take = 10;
    const skip = take * (page - 1);
    const jobs = await Job.find({ skip, take });

    res.json(jobs);
};

export const create = async (req: ValidatedRequest<SaveJobRequestSchema>, res: Response) => {
    const { employmentTypeId, skillIds } = req.body;
    const employmentType = await EmploymentType.findOne(employmentTypeId);

    if (!employmentType) {
        res.status(400).json({
            type: "body",
            message: "Invalid employment type selected.",
        });
        return;
    }

    req.body.employmentType = employmentType;

    const skills = await Skill.findByIds(skillIds);

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
    const job = await Job.findOne(req.params.id);

    if (!job) {
        res.status(404).json({
            message: "Job not found.",
        });
        return;
    }

    const { employmentTypeId, skillIds } = req.body;
    const employmentType = await EmploymentType.findOne(employmentTypeId);

    if (!employmentType) {
        res.status(400).json({
            type: "body",
            message: "Invalid employment type selected.",
        });
        return;
    }

    job.populateViaPutReq(req);

    const oldSkillIds = job.jobSkillPivot?.map(jobSkill => jobSkill.skillId) || [];
    const newSkillIds = difference(skillIds, oldSkillIds);
    const skillIdsShouldDelete = difference(oldSkillIds, skillIds);
    const newSkills = await Skill.findByIds(newSkillIds);

    if (newSkills.length === 0) {
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

    skillIdsShouldDelete.length > 0 && await JobSkill.delete(skillIdsShouldDelete);

    res.json({
        ...job,
        skills: newSkills
    });
};