import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Job } from "./Job";

@Entity({ name: "job_functions" })
export class JobFunction extends Base {

    @Column({
        length: 80,
    })
    name!: string;

    @OneToMany(() => Job, job => job.jobFunction)
    jobs?: Job[];
}
