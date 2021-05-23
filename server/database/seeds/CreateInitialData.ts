import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../models/User'
import bcrypt from "bcrypt";
import { EmploymentType } from '../models/EmploymentType';
import { Level } from '../models/Level';
import { Skill } from '../models/Skill';
import { JobFunction } from '../models/JobFunction';

export default class CreateInitialData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                { username: 'test', password: bcrypt.hashSync("123", 10), createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(EmploymentType)
            .values([
                { name: "Internship", createdAt: new Date(), updatedAt: new Date() },
                { name: "Contract", createdAt: new Date(), updatedAt: new Date() },
                { name: "Part-time", createdAt: new Date(), updatedAt: new Date() },
                { name: "Full-time", createdAt: new Date(), updatedAt: new Date() },
                { name: "Freelance", createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(Level)
            .values([
                { name: "Internship", createdAt: new Date(), updatedAt: new Date() },
                { name: "Entry Level", createdAt: new Date(), updatedAt: new Date() },
                { name: "Associate", createdAt: new Date(), updatedAt: new Date() },
                { name: "Mid-Senior Level", createdAt: new Date(), updatedAt: new Date() },
                { name: "Director", createdAt: new Date(), updatedAt: new Date() },
                { name: "Executive", createdAt: new Date(), updatedAt: new Date() },
                { name: "Not Applicable", createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(Skill)
            .values([
                { name: "PHP", createdAt: new Date(), updatedAt: new Date() },
                { name: "Javascript", createdAt: new Date(), updatedAt: new Date() },
                { name: "NodeJs", createdAt: new Date(), updatedAt: new Date() },
                { name: "ReactJs", createdAt: new Date(), updatedAt: new Date() },
                { name: "Ruby", createdAt: new Date(), updatedAt: new Date() },
                { name: "DevOps", createdAt: new Date(), updatedAt: new Date() },
                { name: "Go Lang", createdAt: new Date(), updatedAt: new Date() },
                { name: "Laravel", createdAt: new Date(), updatedAt: new Date() },
                { name: "Ruby on Rail", createdAt: new Date(), updatedAt: new Date() },
                { name: "Wordpress", createdAt: new Date(), updatedAt: new Date() },
                { name: "CI/CD", createdAt: new Date(), updatedAt: new Date() },
                { name: "NextJs", createdAt: new Date(), updatedAt: new Date() },
                { name: "SCSS", createdAt: new Date(), updatedAt: new Date() },
                { name: "LESS", createdAt: new Date(), updatedAt: new Date() },
                { name: "Amazon Web Services (AWS)", createdAt: new Date(), updatedAt: new Date() },
                { name: "Google Cloud Platforms (GCP)", createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(JobFunction)
            .values([
                { name: "Accounting", createdAt: new Date(), updatedAt: new Date() },
                { name: "Adminstrative", createdAt: new Date(), updatedAt: new Date() },
                { name: "Arts and Design", createdAt: new Date(), updatedAt: new Date() },
                { name: "Business Development", createdAt: new Date(), updatedAt: new Date() },
                { name: "Community and Social Services", createdAt: new Date(), updatedAt: new Date() },
                { name: "Consulting", createdAt: new Date(), updatedAt: new Date() },
                { name: "Education", createdAt: new Date(), updatedAt: new Date() },
                { name: "Engineering", createdAt: new Date(), updatedAt: new Date() },
                { name: "Entrepreneurship", createdAt: new Date(), updatedAt: new Date() },
                { name: "Finance", createdAt: new Date(), updatedAt: new Date() },
                { name: "Healthcare Services", createdAt: new Date(), updatedAt: new Date() },
                { name: "Human Resources", createdAt: new Date(), updatedAt: new Date() },
                { name: "Information Technology", createdAt: new Date(), updatedAt: new Date() },
                { name: "Legal", createdAt: new Date(), updatedAt: new Date() },
                { name: "Marketing", createdAt: new Date(), updatedAt: new Date() },
                { name: "Media and Communication", createdAt: new Date(), updatedAt: new Date() },
                { name: "Operations", createdAt: new Date(), updatedAt: new Date() },
                { name: "Product Management", createdAt: new Date(), updatedAt: new Date() },
                { name: "Program and Project Management", createdAt: new Date(), updatedAt: new Date() },
                { name: "Purchasing", createdAt: new Date(), updatedAt: new Date() },
                { name: "Quality Assurance", createdAt: new Date(), updatedAt: new Date() },
                { name: "Real Estate", createdAt: new Date(), updatedAt: new Date() },
                { name: "Research", createdAt: new Date(), updatedAt: new Date() },
                { name: "Sales", createdAt: new Date(), updatedAt: new Date() },
                { name: "Support", createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();
    }
}