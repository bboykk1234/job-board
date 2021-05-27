import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { NextApiRequestWithId } from "../../@types";
import Job from "../../models/Job";

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
            level: true
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
}