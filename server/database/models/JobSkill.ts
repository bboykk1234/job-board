import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Base } from "./Base";
import { Job } from "./Job";
import { Skill } from "./Skill";

@Entity({ name: "job_skill" })
export class JobSkill extends Base {

    @Column({
        name: "job_id",
        unsigned: true,
    })
    jobId!: number;

    @Column({
        name: "skill_id",
        unsigned: true,
    })
    skillId!: number;

    @ManyToOne(() => Job, job => job.jobSkillPivot)
    @JoinColumn({ name: "job_id" })
    job?: Job;

    @ManyToOne(() => Skill, skill => skill.jobSkillPivot)
    @JoinColumn({ name: "skill_id" })
    skill?: Skill;

}
