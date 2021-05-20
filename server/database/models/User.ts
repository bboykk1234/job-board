import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity({ name: "users" })
export class User extends Base {

    @Column({
        unique: true,
        length: 30,
    })
    username!: string;

    @Column({
        length: 255
    })
    password!: string;
}
