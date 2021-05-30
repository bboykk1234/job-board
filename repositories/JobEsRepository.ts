import Job from "../models/Job";
import JobApplication from "../models/JobApplication";
import ElasticsearchClient from "../services/ElasticsearchClient";
import { extractForJob } from "../services/ExtractSearchKeywords";
import JobApplicationEsRepository from "./JobApplicationEsRepository";

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
                skill_ids: job.skills.map(skill => skill.id),
                closed_at: job.closedAt ? job.closedAt.toISOString() : null,
            }
        })
    }

    static async update(job: Job): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!job.skills) {
                    const skills = await job.$relatedQuery("skills")
                    job.skills = skills
                }

                // TODO: improvement can use queue system to update async
                if (!job.jobApplications) {
                    const jobApplications = await JobApplication.query()
                        .where("job_id", job.id)
                    job.jobApplications = jobApplications.map(jobApplication => {
                        jobApplication.job = job
                        return jobApplication
                    })
                }

                try {
                    if (job.jobApplications.length) {
                        const updateRes = await JobApplicationEsRepository.updateBulk(job.jobApplications)
                        if (updateRes.body.errors) {
                            updateRes.body.items.forEach((item: any) => {
                                console.log(item.index.error)
                            })
                        }
                    }
                } catch (err) {
                    console.log(err.meta.body.error)
                    console.log(err.meta.meta.request)
                    throw err
                }

                await ElasticsearchClient.update({
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
                            skill_ids: job.skills.map(skill => skill.id),
                            closed_at: job.closedAt ? job.closedAt.toISOString() : null,
                        }
                    }
                })

                resolve(true)
            } catch (err) {
                reject(err)
            }
        })
    }

    static async search({
        search,
        employmentTypeIds,
        levelIds,
        jobFunctionIds,
        skillIds,
        companyIds,
        page = 1,
        size = 25,
    }: { search?: string, employmentTypeIds?: string, levelIds?: string, jobFunctionIds?: string, skillIds?: string, companyIds?: string, page?: number, size?: number }): Promise<{ ids: string[], total: number }> {
        return new Promise(async (resolve) => {
            const from = (page - 1) * size
            let query: { bool: { [key: string]: object | object[] } } = {
                bool: {
                    must: {
                        match_all: {}
                    }
                }
            }

            let filters: object[] = [];

            if (employmentTypeIds) {
                filters.push(
                    {
                        terms: {
                            employment_type_id: employmentTypeIds.split(",").map(employmentTypeId => employmentTypeId.trim()),
                        }
                    })
            }

            if (levelIds) {
                filters.push({
                    terms: {
                        level_id: levelIds.split(",").map(levelId => levelId.trim()),
                    }
                })
            }

            if (jobFunctionIds) {
                filters.push({
                    terms: {
                        job_function_id: jobFunctionIds.split(",").map(jobFunctionId => jobFunctionId.trim()),
                    }
                })
            }

            if (companyIds) {
                filters.push({
                    terms: {
                        company_id: companyIds.split(",").map(companyId => companyId.trim()),
                    }
                })
            }

            if (skillIds) {
                filters.push({
                    terms: {
                        skills: skillIds.split(",").map(skillId => skillId.trim()),
                    }
                })
            }

            filters.push({
                term: {
                    closed_at: "1970-01-01T00:00:00Z",
                }
            })

            if (search) {
                query.bool.must = {
                    match: {
                        keywords: {
                            query: search,
                            operator: "and"
                        }
                    }
                }
            }

            query.bool = {
                ...query.bool,
                filter: filters
            }

            const esRes = await ElasticsearchClient.search({
                index: this.indexName,
                type: "_doc",
                track_total_hits: true,
                from,
                size,
                body: {
                    query
                }
            })

            const hits = esRes.body.hits.hits || []
            if (hits.length === 0) {
                resolve({
                    ids: [],
                    total: 0,
                })
            }

            resolve({
                ids: hits.map((hit: { _id: string }) => hit._id),
                total: esRes.body.hits.total.value,
            })
        })
    }
}
