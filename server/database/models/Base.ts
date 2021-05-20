import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false })
export abstract class Base extends BaseEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id!: number;

    @Column({
        name: "created_at",
        nullable: true
    })
    createdAt!: number;

    @Column({
        name: "updated_at",
        nullable: true
    })
    updatedAt!: number;
}
