import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { JobApplication } from "../../database/models/JobApplication";
import { PostJobApplicationRequestSchema } from "../../requests/job_applications";
import { Job } from "../../database/models/Job";
import FileType from "file-type";
import fs from "fs";
import { JobSkill } from "../../database/models/JobSkill";
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
    const jobApplications = await JobApplication.find({
        relations: [
            "job",
            "job.jobSkillPivot",
            "job.jobSkillPivot.skill"
        ]
     });

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

    // res.setHeader('Content-disposition', `attachment; filename=${jobApplication.getName()}.pdf`);
    // res.setHeader('Content-type', 'application/pdf');
    res.contentType('application/pdf')
        .download(
            `storage/resumes/${jobApplication.id}.pdf`,
            `${jobApplication.getName()}.pdf`,
        );
};