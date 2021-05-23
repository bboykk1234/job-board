import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { difference, uniq } from "lodash";
import { EmploymentType } from "../../database/models/EmploymentType";
import { Job } from "../../database/models/Job";
import { JobApplication } from "../../database/models/JobApplication";
import { JobSkill } from "../../database/models/JobSkill";
import { Level } from "../../database/models/Level";
import { Skill } from "../../database/models/Skill";
import { SaveJobRequestSchema } from "../../requests/jobs";

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

export const getApplications = async (req: Request, res: Response) => {
    const jobApplications = await JobApplication.find({ jobId: parseInt(req.params.id) });
    res.json(jobApplications);
}

export const list = async (req: Request, res: Response) => {
    const page = (req.query.page || 1) as number;
    const take = 10;
    const skip = take * (page - 1);
    const jobs = await Job.find({ skip, take });

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
    job.generateKeywords(employmentType, skills);
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

    const { employmentTypeId, skillIds, levelId } = req.body;
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

    job.populateViaPutReq(req);

    const oldSkillIds = job.jobSkillPivot?.map(jobSkill => jobSkill.skillId) || [];
    const newSkillIds = difference(uniqSkillIds, oldSkillIds);
    const skillIdsShouldDelete = difference(oldSkillIds, uniqSkillIds);
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