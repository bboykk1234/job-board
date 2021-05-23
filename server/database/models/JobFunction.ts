import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity({ name: "job_functions" })
export class JobFunction extends Base {

    @Column({
        length: 80,
    })
    name!: string;
}
