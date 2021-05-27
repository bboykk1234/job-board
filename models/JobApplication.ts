import { Model } from "objection";
import Job from "./Job";

export default class JobApplication extends Model {
    id!: number
    jobId!: number
    firstName!: string
    lastName!: string
    email!: string
    phoneNumber!: string
    address!: string
    city!: string
    province!: string
    postalCode!: string
    country!: string
    keywords!: string
    createdAt!: string
    updatedAt!: string

    static tableName = "job_applications"

    static get modifiers() {
        return {
            search(builder: any, word: string) {
                builder.whereRaw(`MATCH(${JobApplication.tableName}.keywords) AGAINST (? IN BOOLEAN MODE)`, [`*${word.replace(/[+\-><\(\)~*\"@]+/, " ")}*`]);
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'jobId',
                'firstName',
                'lastName',
                'email',
                'phoneNumber',
                'address',
                'city',
                'province',
                'postalCode',
                'country',
                'keywords',
            ],

            properties: {
                id: { type: 'integer' },
                jobId: { type: 'integer' },
                firstName: { type: 'string', minLength: 5, maxLength: 255 },
                lastName: { type: 'string', minLength: 5, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                phoneNumber: { type: 'string', minLength: 10, maxLength: 20 },
                address: { type: 'string', minLength: 10, maxLength: 255 },
                city: { type: 'string', minLength: 1, maxLength: 30 },
                province: { type: 'string', minLength: 1, maxLength: 30 },
                postalCode: { type: 'string', minLength: 1, maxLength: 30 },
                country: { type: 'string', minLength: 1, maxLength: 50 },
                keywords: { type: 'string' },
            }
        };
    }

    static get relationMappings() {
        return {
            job: {
                relation: Model.HasOneRelation,
                modelClass: Job,
                join: {
                    from: `${JobApplication.tableName}.job_id`,
                    to: `${Job.tableName}.id`,
                }
            },
        }
    }
}