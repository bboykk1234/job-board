import { ValidatedRequest } from "express-joi-validation";
import { Entity, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { PostJobApplicationRequestSchema } from "../../requests/job_applications";
import { Base } from "./Base";
import { Job } from "./Job";

@Entity({ name: "job_applications" })
export class JobApplication extends Base {

    @ManyToOne(() => Job)
    @JoinColumn({ name: "job_id", referencedColumnName: "id" })
    job?: Job;

    @Column({
        unsigned: true,
        name: "job_id"
    })
    jobId!: number;

    @Column({
        length: 255,
        name: "first_name"
    })
    firstName!: string;

    @Column({
        length: 255,
        name: "last_name"
    })
    lastName!: string;

    @Column({
        length: 255,
    })
    email!: string;

    @Column({
        length: 20,
        name: "phone_number"
    })
    phoneNumber!: string;

    @Column({
        length: 255,
    })
    address!: string;

    @Column({
        length: 30,
    })
    city!: string;

    @Column({
        length: 30,
    })
    province!: string;

    @Column({
        length: 30,
        name: "postal_code"
    })
    postalCode!: string;

    @Column({
        length: 50,
    })
    country!: string;

    @Column({
        type: "text",
        select: false
    })
    @Index({
        fulltext: true,
    })
    keywords!: string;

    static populateViaPostReq(req: ValidatedRequest<PostJobApplicationRequestSchema>): JobApplication {
        const jobApplication = new JobApplication();

        jobApplication.firstName = req.body.firstName;
        jobApplication.lastName = req.body.lastName;
        jobApplication.jobId = req.body.jobId;
        jobApplication.email = req.body.email;
        jobApplication.phoneNumber = req.body.phoneNumber;
        jobApplication.address = req.body.address;
        jobApplication.city = req.body.city;
        jobApplication.province = req.body.province;
        jobApplication.postalCode = req.body.postalCode;
        jobApplication.country = req.body.country;

        return jobApplication;
    }

    getName(): string {
        return this.lastName + ' ' + this.firstName;
    }
}
