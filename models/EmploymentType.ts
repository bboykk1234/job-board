import Job from "./Job";
import Model from "./Model";

export default class EmploymentType extends Model {
    name!: string

    static tableName = "employment_types";

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
                ...this.baseJsonSchema.required
            ],

            properties: {
                name: { type: 'string', minLength: 1, maxLength: 255 },
                ...this.baseJsonSchema.properties
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