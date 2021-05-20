import { Entity, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Base } from "./Base";
import { EmploymentType } from "./EmploymentType";
import { JobSkill } from "./JobSkill";

@Entity({ name: "jobs" })
export class Job extends Base {

    @Column({
        length: 255,
    })
    title!: string;

    @Column({
        length: 255
    })
    location!: string;

    @ManyToOne(() => EmploymentType)
    @JoinColumn({ name: "employment_type_id" })
    employmentType!: EmploymentType;

    @OneToMany(() => JobSkill, jobSkill => jobSkill.job)
    jobSkillPivot!: JobSkill[];
}
