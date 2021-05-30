import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { NextApiRequestWithId, SaveJobRequestSchema, ValidatedAuthRequest } from "../../@types";
import Job from "../../models/Job";
import JobEsRepository from "../../repositories/JobEsRepository";
import JobRepository from "../../repositories/JobRepository";

export default class JobController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const { ids, total } = await JobEsRepository.search(req.query)
        const jobs = await Job.query().withGraphFetched({
            jobFunction: true,
            creator: true,
        })
            .whereIn("id", ids)
            .modify("selectAllExceptDesc")
            .whereNull("closed_at")

        res.json({
            results: jobs,
            total
        })
    }

    static async show(req: NextApiRequestWithId, res: NextApiResponse, next: NextHandler) {
        const job = await Job.query().where({ id: req.params.id }).withGraphFetched({
            creator: true,
            jobFunction: true,
            employmentType: true,
            level: true,
            skills: true,
            company: true,
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

    static async create(req: ValidatedAuthRequest<SaveJobRequestSchema>, res: NextApiResponse, next: NextHandler) {
        const job = await JobRepository.createBasedOnReqBody(req.user, req.body)
        const esRes = await JobEsRepository.create(job)

        if (esRes.body.result != "created") {
            console.log(esRes)
        }

        res.json(job);
    }

    static async update(req: ValidatedAuthRequest<SaveJobRequestSchema>, res: NextApiResponse, next: NextHandler) {
        const job = await JobRepository.updateBasedOnReqBody(req.params.id, req.user, req.body)
        const esRes = await JobEsRepository.update(job)

        delete job.jobApplications
        res.json(job);
    }

    static async close(req: NextApiRequestWithId, res: NextApiResponse) {
        const affected = await Job.query()
            .findById(req.params.id)
            .patch(
                { closedAt: new Date }
            )
        const job = await Job.query()
            .findById(req.params.id)

        const esRes = await JobEsRepository.update(job)

        if (esRes.body.result != "updated") {
            console.log(esRes)
        }

        res.json({
            status: affected && affected >= 0,
        });
    }
}