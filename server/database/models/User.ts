import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    createdAt!: number;

    @Column({ nullable: true })
    updatedAt!: number;
}
