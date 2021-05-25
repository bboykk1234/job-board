import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn, BeforeUpdate } from "typeorm";

@Entity({ synchronize: false })
export abstract class Base extends BaseEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id!: number;

    @Column({
        name: "created_at",
        type: "timestamp",
        nullable: true
    })
    createdAt!: Date;

    @Column({
        name: "updated_at",
        type: "timestamp",
        nullable: true,
        default: null,
    })
    updatedAt!: Date;

    @BeforeInsert()
    setDates() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    setUpdatedAtToNow() {
        this.updatedAt = new Date();
    }
}
