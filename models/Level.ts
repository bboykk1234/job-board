import Job from "./Job";
import Model from "./Model";

export default class Level extends Model {
    name!: string

    static tableName = "levels";

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
                    from: `${Level.tableName}.id`,
                    to: `${Job.tableName}.level_id`,
                }
            },
        }
    }
}