import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { JobApplication } from "../../database/models/JobApplication";
import { PostJobApplicationRequestSchema } from "../../requests/job_applications";
import { Job } from "../../database/models/Job";
import FileType from "file-type";
import fs from "fs";
import path from "path";
import { extractSearchKeywordsForJobApplication } from "../../services/search_keywords";
import { Skill } from "../../database/models/Skill";

export const get = async (req: Request, res: Response) => {
    const jobApplication = await JobApplication.findOne(req.params.id);

    if (!jobApplication) {
        res.status(404).json({
            message: "Job application not found",
        });
        return;
    }

    res.json(jobApplication);
};

export const list = async (req: Request, res: Response) => {
    const { jobId, search } = req.query;
    const query = JobApplication.createQueryBuilder()
        .innerJoinAndSelect(`${JobApplication.name}.job`, Job.name);
    let whereConditions: { params: { jobId?: string, search?: string }, values: string[] } = {
        params: {},
        values: [],
    };

    if (jobId) {
        whereConditions.values.push(`${Job.name}.id = :jobId`);
        whereConditions.params.jobId = jobId as string;
    }

    if (search) {
        whereConditions.values.push(`MATCH(${JobApplication.name}.keywords) AGAINST (:search IN BOOLEAN MODE)`);
        whereConditions.params.search = `*${search}*`;
    }

    if (whereConditions.values.length) {
        query.where(whereConditions.values.join(" AND "), whereConditions.params);
    }

    const jobApplications = await query.getMany();

    // TODO: Optimize
    for (const jobApplication of jobApplications) {
        if (!jobApplication.job) {
            continue;
        }
        const job = jobApplication.job;
        job.jobSkillPivot = await Job.createQueryBuilder()
            .relation("jobSkillPivot")
            .of(job)
            .loadMany();
        const skillIds = job.jobSkillPivot?.map(jobSkill => jobSkill.skillId) || [];
        const skills = await Skill.findByIds(skillIds);
        jobApplication.job.skills = skills;
        delete jobApplication.job.jobSkillPivot;
    }

    res.json(jobApplications);
};

export const create = async (req: ValidatedRequest<PostJobApplicationRequestSchema>, res: Response) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({
            type: "file",
            message: "Missing resume file",
        });
    }

    const resumeFileType = await FileType.fromFile(file.path);

    if (!resumeFileType || resumeFileType.mime != "application/pdf") {
        res.status(400).json({
            type: "file",
            message: "Uploaded resume is not PDF",
        });
    }

    const { jobId } = req.body;
    const job = await Job.findOne(jobId);

    if (!job) {
        res.status(400).json({
            type: "body",
            message: "Invalid job selected.",
        });
        return;
    }

    const jobApplication = JobApplication.populateViaPostReq(req);
    jobApplication.keywords = await extractSearchKeywordsForJobApplication(jobApplication);
    await jobApplication.save();
    fs.renameSync(file.path, `storage/resumes/${jobApplication.id}.pdf`);

    res.json(jobApplication);
};

export const download = async (req: Request, res: Response) => {
    const { id } = req.params;
    const jobApplication = await JobApplication.findOne(id);

    if (!jobApplication) {
        res.redirect("/resume_not_found");
        return;
    }

    res.contentType('application/pdf')
        .sendFile(
            path.join(__dirname, "../../../", `storage/resumes/${jobApplication.id}.pdf`),
        );
};