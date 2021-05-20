import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { Job } from "./Job";
import { Skill } from "./Skill";

@Entity({ name: "job_skill" })
export class JobSkill extends Base {

    @ManyToOne(() => Job, job => job.jobSkillPivot)
    @JoinColumn({ name: "job_id" })
    job!: Job;

    @ManyToOne(() => Skill, skill => skill.jobSkillPivot)
    @JoinColumn({ name: "skill_id" })
    skill!: Skill;

}
