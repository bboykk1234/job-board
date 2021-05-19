import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./models/User";
import bcrypt from "bcrypt";
import 'dotenv/config';

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.username = "test";
    user.password = bcrypt.hashSync("123", 10);
    await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
