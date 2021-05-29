import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { CreateJobApplicationRequestSchema, NextApiRequestWithId, ValidatedRequestWithFiles } from "../../@types";
import JobApplication from "../../models/JobApplication";
import { File } from "formidable";
import Job from "../../models/Job";
import FileType from "file-type";
import fs from "fs";
import path from "path";
import JobApplicationEsRepository from "../../repositories/JobApplicationEsRepository";

export default class JobApplicationController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const { jobId, search } = req.query as { jobId?: string, search?: string };

        const { ids: jobApplicationIds, total } = await JobApplicationEsRepository.search({ jobId, search })
        const jobApplications = await JobApplication.query()
            .whereIn("id", jobApplicationIds)
            .withGraphFetched("job(selectAllExceptDesc).[skills]")

        res.json({
            results: jobApplications,
            total
        })
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
        const jobApplication = await JobApplication.transaction(async () => {
            const jobApplication = await JobApplication.query()
                .insert(jobApplicationObj)
            const esRes = await JobApplicationEsRepository.create(jobApplication)
            if (esRes.body.result != "created") {
                console.log(esRes)
            }
            fs.renameSync(file.path, `storage/resumes/${jobApplication.id}.pdf`);

            return jobApplication
        })

        res.json(jobApplication);
    }

    static async download(req: NextApiRequestWithId, res: NextApiResponse, next: NextHandler) {
        const { id } = req.params;
        const jobApplication = await JobApplication.query().findById(id);

        if (!jobApplication) {
            res.status(404).end()
            return;
        }

        const filePath = path.join(__dirname, "../../", `storage/resumes/${jobApplication.id}.pdf`)

        if (!fs.existsSync(filePath)) {
            res.status(404).end()
            return
        }

        const fileBuffer = fs.readFileSync(filePath);

        res.setHeader("Content-Type", "application/pdf")
        res.send(fileBuffer);
    }
}