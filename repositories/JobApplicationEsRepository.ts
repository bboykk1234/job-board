import JobApplication from "../models/JobApplication";
import ElasticsearchClient from "../services/ElasticsearchClient";
import { extractForJobApplication } from "../services/ExtractSearchKeywords";

export default class JobApplicationEsRepository {
    static indexName = "job_applications"

    static async create(jobApplication: JobApplication) {
        return ElasticsearchClient.create({
            id: `${jobApplication.id}`,
            type: "_doc",
            index: this.indexName,
            body: {
                job_id: jobApplication.jobId,
                keywords: await extractForJobApplication(jobApplication),
            }
        })
    }

    static async search({
        jobId,
        search,
        from = 0,
        size = 25,
    }: {
        jobId?: string,
        search?: string,
        from?: number,
        size?: number,
    }): Promise<{ ids: string[], total: number }> {
        return new Promise(async (resolve) => {
            let query: { bool: { [key: string]: object } } = {
                bool: {
                    must: {
                        match_all: {}
                    }
                }
            }

            if (jobId) {
                query.bool.filter = {
                    term: {
                        job_id: jobId,
                    }
                }
            }

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