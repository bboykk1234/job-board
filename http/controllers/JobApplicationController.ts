import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { CreateJobApplicationRequestSchema, ValidatedRequestWithFiles } from "../../@types";
import JobApplication from "../../models/JobApplication";
import { File } from "formidable";
import Job from "../../models/Job";
import FileType from "file-type";
import { extractForJobApplication } from "../../services/ExtractSearchKeywords";
import fs from "fs";

export default class JobApplicationController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const { jobId: jobId, search } = req.query;
        const query = JobApplication.query().withGraphFetched("job(selectAllExceptDesc)")

        if (jobId) {
            query.modifyGraph("job", builder => {
                builder.where({ id: jobId });
            })
        }

        if (search) {
            query.modify("search", search);
        }

        const jobApplications = await query.page(0, 25)

        res.json(jobApplications)
    }

    static async create(req: ValidatedRequestWithFiles<CreateJobApplicationRequestSchema>, res: NextApiResponse, next: NextHandler) {
        const file = req.file as File;
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
        const job = await Job.query().findById(jobId);

        if (!job) {
            res.status(400).json({
                type: "body",
                message: "Invalid job selected.",
            });
            return;
        }

        const jobApplicationObj = JobApplication.populateViaPostReq(req);
        jobApplicationObj.keywords = await extractForJobApplication(jobApplicationObj);
        const jobApplication = await JobApplication.query()
            .insert(jobApplicationObj)

        fs.renameSync(file.path, `storage/resumes/${jobApplication.id}.pdf`);

        res.json(jobApplication);
    }
}