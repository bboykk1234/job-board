import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Base } from "./Base";
import { JobSkill } from "./JobSkill";

@Entity({ name: "skills" })
export class Skill extends Base {

    @Column({
        length: 255,
    })
    name!: string;

    @OneToMany(() => JobSkill, jobSkill => jobSkill.job)
    jobSkillPivot!: JobSkill[];
}
