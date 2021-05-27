import { Model } from "objection";
import Job from "./Job";

export default class EmploymentType extends Model {
    id!: number
    name!: string
    createdAt!: string
    updatedAt!: string

    static tableName = "employment_types";

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
                    from: `${EmploymentType.tableName}.id`,
                    to: `${Job.tableName}.employment_type_id`,
                }
            },
        }
    }
}