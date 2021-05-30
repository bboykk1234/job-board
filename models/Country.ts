import JobApplication from "./JobApplication";
import Model from "./Model";

export default class Country extends Model {
    isoCode!: string
    iso3Code!: string
    phoneCode!: number
    name!: string

    static tableName = "countries";

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                isoCode: { type: 'string', minLength: 1, maxLength: 2 },
                iso3Code: { type: 'string', minLength: 1, maxLength: 3 },
                phoneCode: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 80 },
            }
        };
    }

    static get relationMappings() {
        return {
            jobApplicationsByCountry: {
                relation: Model.ManyToManyRelation,
                modelClass: JobApplication,
                join: {
                    from: `${Country.tableName}.id`,
                    to: `${JobApplication.tableName}.county_id`
                }
            },
            jobApplicationsByPhone: {
                relation: Model.ManyToManyRelation,
                modelClass: JobApplication,
                join: {
                    from: `${Country.tableName}.id`,
                    to: `${JobApplication.tableName}.phone_code`
                }
            }
        }
    }
}
