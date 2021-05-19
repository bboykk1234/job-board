import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../models/User'
import bcrypt from "bcrypt";

export default class CreateDemoUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { username: 'test', password: bcrypt.hashSync("123", 10) },
      ])
      .execute()
  }
}