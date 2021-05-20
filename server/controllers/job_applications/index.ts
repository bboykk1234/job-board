import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { JobApplication } from "../../database/models/JobApplication";
import { PostJobApplicationRequestSchema } from "../../requests/job_applications";
import { Job } from "../../database/models/Job";

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
    const page = (req.query.page || 1) as number;
    const take = 10;
    const skip = take * (page - 1);
    const jobApplications = await JobApplication.find({ skip, take });

    res.json(jobApplications);
};

export const create = async (req: ValidatedRequest<PostJobApplicationRequestSchema>, res: Response) => {
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

    res.json(jobApplication);
};