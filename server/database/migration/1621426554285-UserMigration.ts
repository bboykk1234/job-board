import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1621426554285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    unsigned: true,
                    isPrimary: true
                },
                {
                    name: "username",
                    type: "varchar",
                    length: "30"
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: true,
                    default: null
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: true,
                    default: null
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
