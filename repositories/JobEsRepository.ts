import Job from "../models/Job";
import ElasticsearchClient from "../services/ElasticsearchClient";
import { extractForJob } from "../services/ExtractSearchKeywords";

export default class JobEsRepository {
    static indexName = "jobs"

    static async create(job: Job) {
        if (!job.skills) {
            const skills = await job.$relatedQuery("skills")
            job.skills = skills
        }

        return ElasticsearchClient.create({
            id: `${job.id}`,
            type: "_doc",
            index: this.indexName,
            body: {
                employment_type_id: job.employmentTypeId,
                level_id: job.levelId,
                job_function_id: job.jobFunctionId,
                company_id: job.companyId,
                keywords: await extractForJob(job),
                skills: job.skills.map(skill => skill.id),
                closed_at: job.closedAt,
            }
        })
    }

    static async update(job: Job) {
        if (!job.skills) {
            const skills = await job.$relatedQuery("skills")
            job.skills = skills
        }

        return ElasticsearchClient.update({
            id: `${job.id}`,
            type: "_doc",
            index: this.indexName,
            body: {
                doc: {
                    employment_type_id: job.employmentTypeId,
                    level_id: job.levelId,
                    job_function_id: job.jobFunctionId,
                    company_id: job.companyId,
                    keywords: await extractForJob(job),
                    skills: job.skills.map(skill => skill.id),
                    closed_at: job.closedAt,
                }
            }
        })
    }
}