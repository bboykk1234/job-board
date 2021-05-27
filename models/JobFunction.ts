import { Model } from "objection";
import Job from "./Job";

export default class JobFunction extends Model {
    id!: number
    name!: string
    createdAt!: string
    updatedAt!: string

    static tableName = "job_functions";

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
            }
        };
    }

    static get relationMappings() {
        return {
            jobs: {
                relation: Model.HasManyRelation,
                modelClass: Job,
                join: {
                    from: `${JobFunction.tableName}.id`,
                    to: `${Job.tableName}.job_function_id`,
                }
            },
        }
    }
}