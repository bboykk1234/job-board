import { Model } from "objection";
import Job from "./Job";

export default class Level extends Model {
    id!: number
    name!: string
    createdAt!: string
    updatedAt!: string

    static tableName = "levels";

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
                    from: `${Level.tableName}.id`,
                    to: `${Job.tableName}.level_id`,
                }
            },
        }
    }
}