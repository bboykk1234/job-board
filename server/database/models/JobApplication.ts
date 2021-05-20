import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./Base";
import { Job } from "./Job";

@Entity({ name: "job_applications" })
export class Skill extends Base {

    @ManyToOne(() => Job)
    @JoinColumn({name: "job_id"})
    job!: Job;

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
}
