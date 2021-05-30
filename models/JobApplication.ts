import { CreateJobApplicationRequestSchema, ValidatedRequestWithFiles } from "../@types";
import Country from "./Country";
import Job from "./Job";
import Model from "./Model";

export default class JobApplication extends Model {
  jobId!: number
  firstName!: string
  lastName!: string
  email!: string
  phoneId!: number
  phoneNumber!: string
  address!: string
  city!: string
  province!: string
  postalCode!: string
  countryId!: number

  country?: Country
  phoneCountry?: Country
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
    jobApplication.phoneId = req.body.phoneId;
    jobApplication.phoneNumber = req.body.phoneNumber;
    jobApplication.address = req.body.address;
    jobApplication.city = req.body.city;
    jobApplication.province = req.body.province;
    jobApplication.postalCode = req.body.postalCode;
    jobApplication.countryId = req.body.countryId;

    return jobApplication;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'jobId',
        'firstName',
        'lastName',
        'email',
        'phoneId',
        'phoneNumber',
        'address',
        'city',
        'province',
        'postalCode',
        'countryId',
        ...this.baseJsonSchema.required
      ],

      properties: {
        jobId: { type: 'integer' },
        firstName: { type: 'string', minLength: 5, maxLength: 255 },
        lastName: { type: 'string', minLength: 5, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        phoneId: { type: 'integer' },
        phoneNumber: { type: 'string', minLength: 10, maxLength: 20 },
        address: { type: 'string', minLength: 10, maxLength: 255 },
        city: { type: 'string', minLength: 1, maxLength: 30 },
        province: { type: 'string', minLength: 1, maxLength: 30 },
        postalCode: { type: 'string', minLength: 1, maxLength: 30 },
        countryId: { type: 'integer' },
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
      phoneCountry: {
        relation: Model.HasOneRelation,
        modelClass: Country,
        join: {
          from: `${JobApplication.tableName}.phone_id`,
          to: `${Country.tableName}.id`,
        }
      },
      country: {
        relation: Model.HasOneRelation,
        modelClass: Country,
        join: {
          from: `${JobApplication.tableName}.country_id`,
          to: `${Country.tableName}.id`,
        }
      }
    }
  }
}
