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
}