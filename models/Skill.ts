import { Model } from "objection";
import Job from "./Job";

export default class Skill extends Model {
    id!: number
    name!: string
    createdAt!: string
    updatedAt!: string

    static tableName = "skills";

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
                relation: Model.ManyToManyRelation,
                modelClass: Job,
                join: {
                    from: `${Skill.tableName}.id`,
                    through: {
                        from: 'job_skill.job_id',
                        to: 'job_skill.skill_id'
                    },
                    to: `${Job.tableName}.id`
                }
            }
        }
    }
}