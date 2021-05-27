import { Model, QueryBuilder } from "objection";
import EmploymentType from "./EmploymentType";
import JobFunction from "./JobFunction";
import Level from "./Level";
import Skill from "./Skill";
import User from "./User";

export default class Job extends Model {
    id!: number
    creatorId!: number
    title!: string
    description!: string
    location!: string
    employmentTypeId!: number
    levelId!: number
    jobFunctionId!: number
    closedAt!: string
    createdAt!: string
    updatedAt!: string

    static tableName = "jobs"

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
            ],

            properties: {
                id: { type: 'integer' },
                creatorId: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string' },
                location: { type: 'string', minLength: 1, maxLength: 255 },
                employmentTypeId: { type: 'integer' },
                levelId: { type: 'integer' },
                jobFunctionId: { type: 'integer' },
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
                        from: 'job_skill.job_id',
                        to: 'job_skill.skill_id'
                    },
                    to: `${Skill.tableName}.id`
                }
            }
        }
    }
}