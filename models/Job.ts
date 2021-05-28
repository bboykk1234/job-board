import { RawDraftContentState } from "draft-js";
import { SaveJobRequestSchema, ValidatedAuthRequest } from "../@types";
import EmploymentType from "./EmploymentType";
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
    employmentTypeId!: number
    levelId!: number
    jobFunctionId!: number
    closedAt!: string

    skills?: Skill[]
    employmentType?: EmploymentType
    level?: Level
    jobFunction?: JobFunction

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

    static populateViaPostReq(req: ValidatedAuthRequest<SaveJobRequestSchema>): Job {
        const { title, location, description, employmentTypeId, levelId, jobFunctionId } = req.body;

        const job = new Job();
        job.title = title;
        job.location = location;
        job.description = description;
        job.employmentTypeId = employmentTypeId;
        job.levelId = levelId
        job.jobFunctionId = jobFunctionId;
        job.creatorId = req.user.id;

        return job;
    }

    populateViaPutReq(req: ValidatedAuthRequest<SaveJobRequestSchema>): Job {
        const { title, location, employmentTypeId, description, levelId, jobFunctionId } = req.body;

        if (this.employmentTypeId != employmentTypeId) {
            this.employmentTypeId = employmentTypeId;
        }

        if (this.levelId != levelId) {
            this.levelId = levelId;
        }

        if (this.jobFunctionId != jobFunctionId) {
            this.jobFunctionId = jobFunctionId;
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
            }
        }
    }
}