import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity({ name: "levels" })
export class Level extends Base {

    @Column({
        length: 255,
    })
    name!: string;
}
