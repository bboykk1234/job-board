import { Model as Base, snakeCaseMappers } from "objection";

export default abstract class Model extends Base {
    id!: number
    createdAt!: Date
    updatedAt!: Date

    static baseJsonSchema = {
        required: ["createdAt", "updatedAt"],
        properties: {
            id: { type: 'integer' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
        }
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    $beforeInsert() {
        const now = new Date();
        this.createdAt = now;
        this.updatedAt = now;
    }

    $beforeUpdate() {
        const now = new Date();
        this.updatedAt = now;
    }
}