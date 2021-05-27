import { Model, Pojo } from "objection";
import Job from "./Job";

export default class User extends Model {
    id!: number
    username!: string
    password!: string
    createdAt!: string
    updatedAt!: string

    static tableName = "users";

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password'],

            properties: {
                id: { type: 'integer' },
                username: { type: 'string', minLength: 30, maxLength: 30 },
                password: { type: 'string', minLength: 255, maxLength: 255 },
            }
        };
    }

    static get relationMappings() {
        return {
            jobs: {
                relation: Model.HasManyRelation,
                modelClass: Job,
                join: {
                    from: `${User.tableName}.id`,
                    to: `${Job.tableName}.creator_id`,
                }
            },
        }
    }

    $formatJson(json: Pojo) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }
}