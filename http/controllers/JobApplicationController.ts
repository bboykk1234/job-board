import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import JobApplication from "../../models/JobApplication";

export default class JobApplicationController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const { job_id: jobId, search } = req.query;
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
}