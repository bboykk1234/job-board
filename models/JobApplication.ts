import { CreateJobApplicationRequestSchema, ValidatedRequestWithFiles } from "../@types";
import Job from "./Job";
import Model from "./Model";

export default class JobApplication extends Model {
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

    job?: Job

    static tableName = "job_applications"

    get name() {
        return `${this.firstName} ${this.lastName}`
    }

    static populateViaPostReq(req: ValidatedRequestWithFiles<CreateJobApplicationRequestSchema>): JobApplication {
        const jobApplication = new JobApplication();

        jobApplication.firstName = req.body.firstName;
        jobApplication.lastName = req.body.lastName;
        jobApplication.jobId = req.body.jobId;
        jobApplication.email = req.body.email;
        jobApplication.phoneNumber = req.body.phoneNumber;
        jobApplication.address = req.body.address;
        jobApplication.city = req.body.city;
        jobApplication.province = req.body.province;
        jobApplication.postalCode = req.body.postalCode;
        jobApplication.country = req.body.country;

        return jobApplication;
    }

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
                ...this.baseJsonSchema.required
            ],

            properties: {
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
                ...this.baseJsonSchema.properties
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