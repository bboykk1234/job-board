import Job from "./Job";
import Model from "./Model";
import Skill from "./Skill";

export default class JobSkill extends Model {
    jobId!: number
    skillId!: number

    static tableName = "job_skill";

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'jobId',
                'skillId',
                ...this.baseJsonSchema.required
            ],

            properties: {
                jobId: { type: 'integer' },
                skillId: { type: 'integer' },
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
                    from: `${JobSkill.tableName}.jobId`,
                    to: `${Job.tableName}.id`
                }
            },
            skill: {
                relation: Model.HasOneRelation,
                modelClass: Skill,
                join: {
                    from: `${JobSkill.tableName}.skillId`,
                    to: `${Skill.tableName}.id`
                }
            }
        }
    }
}