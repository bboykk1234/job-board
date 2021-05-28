import { Pojo } from "objection";
import Job from "./Job";
import Model from "./Model";

export default class User extends Model {
    username!: string
    password!: string

    static tableName = "users";

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'username',
                'password',
                ...this.baseJsonSchema.required
            ],

            properties: {
                username: { type: 'string', minLength: 30, maxLength: 30 },
                password: { type: 'string', minLength: 255, maxLength: 255 },
                ...this.baseJsonSchema.properties,
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