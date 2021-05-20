import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity({ name: "employment_types" })
export class EmploymentType extends Base {

    @Column({
        length: 255,
    })
    name!: string;
}
