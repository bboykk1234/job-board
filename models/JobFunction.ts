import Job from "./Job";
import Model from "./Model";

export default class JobFunction extends Model {
    name!: string

    static tableName = "job_functions";

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
                ...this.baseJsonSchema.required
            ],

            properties: {
                name: { type: 'string', minLength: 1, maxLength: 255 },
                ...this.baseJsonSchema.properties,
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