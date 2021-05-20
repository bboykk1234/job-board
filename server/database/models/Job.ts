import { ValidatedRequest } from "express-joi-validation";
import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SaveJobRequestSchema } from "../../requests/jobs";
import { Base } from "./Base";
import { EmploymentType } from "./EmploymentType";
import { JobSkill } from "./JobSkill";
import { User } from "./User";

@Entity({ name: "jobs" })
export class Job extends Base {

    @ManyToOne(() => User)
    @JoinColumn({ name: "creator_id" })
    creator!: User

    @Column({
        length: 255,
    })
    title!: string;

    // @Column({
    //     type: "text"
    // })
    // description!: string;

    // @Column({
    //     type: "text"
    // })
    // keywords!: string;

    @Column({
        length: 255
    })
    location!: string;

    @Column({
        name: "employment_type_id",
        unsigned: true,
    })
    employmentTypeId!: number;

    @ManyToOne(() => EmploymentType)
    @JoinColumn({ name: "employment_type_id" })
    employmentType?: EmploymentType;

    @OneToMany(() => JobSkill, jobSkill => jobSkill.job)
    jobSkillPivot?: JobSkill[];

    static populateViaPostReq(req: ValidatedRequest<SaveJobRequestSchema>): Job {
        const { title, location, employmentType } = req.body;

        if (!employmentType) {
            throw new Error("Missing employment type to populate new job.");
        }

        const job = new Job();
        job.title = title;
        job.location = location;
        job.employmentType = employmentType;
        job.creator = req.user as User;

        return job;
    }

    populateViaPutReq(req: ValidatedRequest<SaveJobRequestSchema>): Job {
        const { title, location, employmentTypeId } = req.body;

        if (this.employmentTypeId != employmentTypeId) {
            this.employmentTypeId = employmentTypeId;
        }

        this.title = title;
        this.location = location;

        return this;
    }
}
