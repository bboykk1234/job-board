import { RawDraftContentState } from "draft-js";
import { SaveJobRequestBody, SaveJobRequestSchema, ValidatedAuthRequest } from "../@types";
import Company from "./Company";
import EmploymentType from "./EmploymentType";
import JobApplication from "./JobApplication";
import JobFunction from "./JobFunction";
import JobSkill from "./JobSkill";
import Level from "./Level";
import Model from "./Model";
import Skill from "./Skill";
import User from "./User";

export default class Job extends Model {
    creatorId!: number
    title!: string
    description!: string
    location!: string
    companyId!: number
    employmentTypeId!: number
    levelId!: number
    jobFunctionId!: number
    closedAt!: Date | null

    skills?: Skill[]
    employmentType?: EmploymentType
    level?: Level
    jobFunction?: JobFunction
    company?: Company
    jobApplications?: JobApplication[]

    static tableName = "jobs"

    getDescriptionPlainText(): string {
        if (!this.description) {
            return "";
        }

        const { blocks = [] } = JSON.parse(this.description) as RawDraftContentState;
        const nonEmptyBlockTexts = blocks.map(block => block?.text?.trim().toLowerCase() || "")
            .filter(text => text != "");

        return nonEmptyBlockTexts.join(" ");
    }

    static populateViaPostReqBody({
        title,
        location,
        description,
        companyId,
        employmentTypeId,
        levelId,
        jobFunctionId
    }: SaveJobRequestBody): Job {
        const job = new Job();
        job.title = title;
        job.location = location;
        job.description = description;
        job.companyId = companyId;
        job.employmentTypeId = employmentTypeId;
        job.levelId = levelId
        job.jobFunctionId = jobFunctionId;

        return job;
    }

    populateViaPutReqBody({
        title,
        location,
        description,
        companyId,
        employmentTypeId,
        levelId,
        jobFunctionId
    }: SaveJobRequestBody): Job {
        if (this.employmentTypeId != employmentTypeId) {
            this.employmentTypeId = employmentTypeId;
        }

        if (this.levelId != levelId) {
            this.levelId = levelId;
        }

        if (this.jobFunctionId != jobFunctionId) {
            this.jobFunctionId = jobFunctionId;
        }

        if (this.companyId != companyId) {
            this.companyId = companyId;
        }

        this.title = title;
        this.location = location;
        this.description = description;

        return this;
    }

    static get modifiers() {
        return {
            selectAllExceptDesc(builder: any) {
                const { ref } = Job;
                builder.select(
                    ref("id"),
                    ref("creator_id"),
                    ref("title"),
                    ref("location"),
                    ref("company_id"),
                    ref("employment_type_id"),
                    ref("level_id"),
                    ref("job_function_id"),
                    ref("closed_at"),
                    ref("created_at"),
                    ref("updated_at")
                )
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'creatorId',
                'title',
                'description',
                'location',
                'companyId',
                'employmentTypeId',
                'levelId',
                'jobFunctionId',
                ...this.baseJsonSchema.required
            ],

            properties: {
                creatorId: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string' },
                location: { type: 'string', minLength: 1, maxLength: 255 },
                companyId: { type: 'integer' },
                employmentTypeId: { type: 'integer' },
                levelId: { type: 'integer' },
                jobFunctionId: { type: 'integer' },
                ...this.baseJsonSchema.properties
            }
        };
    }

    static get relationMappings() {
        return {
            creator: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${Job.tableName}.creator_id`,
                    to: `${User.tableName}.id`,
                }
            },
            company: {
                relation: Model.BelongsToOneRelation,
                modelClass: Company,
                join: {
                    from: `${Job.tableName}.company_id`,
                    to: `${Company.tableName}.id`,
                }
            },
            employmentType: {
                relation: Model.BelongsToOneRelation,
                modelClass: EmploymentType,
                join: {
                    from: `${Job.tableName}.employment_type_id`,
                    to: `${EmploymentType.tableName}.id`,
                }
            },
            level: {
                relation: Model.BelongsToOneRelation,
                modelClass: Level,
                join: {
                    from: `${Job.tableName}.level_id`,
                    to: `${Level.tableName}.id`,
                }
            },
            jobFunction: {
                relation: Model.BelongsToOneRelation,
                modelClass: JobFunction,
                join: {
                    from: `${Job.tableName}.job_function_id`,
                    to: `${JobFunction.tableName}.id`,
                }
            },
            skills: {
                relation: Model.ManyToManyRelation,
                modelClass: Skill,
                join: {
                    from: `${Job.tableName}.id`,
                    through: {
                        from: `${JobSkill.tableName}.job_id`,
                        to: `${JobSkill.tableName}.skill_id`
                    },
                    to: `${Skill.tableName}.id`
                }
            },
            jobApplications: {
                relation: Model.HasManyRelation,
                modelClass: JobApplication,
                join: {
                    from: `${Job.tableName}.id`,
                    to: `${JobApplication.tableName}.job_id`
                }
            }
        }
    }
}