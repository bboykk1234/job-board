import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { NextApiRequestWithId, SaveJobRequestSchema, ValidatedAuthRequest } from "../../@types";
import Job from "../../models/Job";
import JobSkill from "../../models/JobSkill";
import JobManager from "../../services/JobManager";

export default class JobController {
    static async index(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
        const {
            search,
            employmentTypeIds,
            levelIds,
            jobFunctionIds,
            skillIds,
            companyIds
        } = req.query as { search?: string, employmentTypeIds?: string, levelIds?: string, jobFunctionIds?: string, skillIds?: string, companyIds?: string }
        const query = Job.query().withGraphFetched({
            jobFunction: true,
            creator: true,
        })
            .modify("selectAllExceptDesc")
            .whereNull("closed_at")
            .page(0, 25)

        if (employmentTypeIds) {
            query.whereIn("employment_type_id", employmentTypeIds.split(",").map(employmentTypeId => employmentTypeId.trim()))
        }

        if (levelIds) {
            query.whereIn("level_id", levelIds.split(",").map(levelId => levelId.trim()))
        }

        if (jobFunctionIds) {
            query.whereIn("level_id", jobFunctionIds.split(",").map(jobFunctionId => jobFunctionId.trim()))
        }

        if (companyIds) {
            query.whereIn("company_id", companyIds.split(",").map(companyId => companyId.trim()))
        }

        if (skillIds) {
            query.whereExists(query => {
                query.select("id").from(`${JobSkill.tableName}`)
                    .whereRaw(`${Job.tableName}.id = ${JobSkill.tableName}.job_id`).whereIn("skill_id", skillIds.split(",").map(skillId => skillId.trim()))
            })
        }

        const jobs = await query

        res.json(jobs)
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
        const job = await JobManager.createBasedOnReqBody(req.user, req.body)
        res.json(job);
    }

    static async update(req: ValidatedAuthRequest<SaveJobRequestSchema>, res: NextApiResponse, next: NextHandler) {
        const job = await JobManager.updateBasedOnReqBody(req.params.id, req.user, req.body)

        res.json(job);
    }

    static async close(req: NextApiRequestWithId, res: NextApiResponse) {
        const affected = await Job.query()
            .findById(req.params.id)
            .patch(
                { closedAt: new Date }
            )

        res.json({
            status: affected && affected >= 0,
        });
    }
}