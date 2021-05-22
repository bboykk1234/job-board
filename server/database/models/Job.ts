import { ValidatedRequest } from "express-joi-validation";
import { Entity, Column, JoinColumn, ManyToOne, OneToMany, Index } from "typeorm";
import { SaveJobRequestSchema } from "../../requests/jobs";
import { Base } from "./Base";
import { EmploymentType } from "./EmploymentType";
import { JobSkill } from "./JobSkill";
import { User } from "./User";
import { RawDraftContentState } from "draft-js";
import keywordExtractor from "keyword-extractor";
import { Skill } from "./Skill";
import { uniq } from "lodash";

@Entity({ name: "jobs" })
export class Job extends Base {

    @ManyToOne(() => User)
    @JoinColumn({ name: "creator_id" })
    creator!: User

    @Column({
        length: 255,
    })
    title!: string;

    @Column({
        type: "text"
    })
    description!: string;

    @Column({
        type: "text"
    })
    @Index({
        fulltext: true
    })
    keywords!: string;

    @Column({
        length: 255
    })
    location!: string;

    @Column({
        type: "tinyint",
        name: "min_years_work_exp",
        nullable: true
    })
    minYearsWorkExp!: number | null;

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
        const { title, location, employmentType, description, minYearsWorkExp } = req.body;

        if (!employmentType) {
            throw new Error("Missing employment type to populate new job.");
        }

        const job = new Job();
        job.title = title;
        job.location = location;
        job.description = description;
        job.minYearsWorkExp = minYearsWorkExp;
        job.keywords = "";
        job.employmentType = employmentType;
        job.creator = req.user as User;

        return job;
    }

    populateViaPutReq(req: ValidatedRequest<SaveJobRequestSchema>): Job {
        const { title, location, employmentTypeId, description, minYearsWorkExp } = req.body;

        if (this.employmentTypeId != employmentTypeId) {
            this.employmentTypeId = employmentTypeId;
        }

        this.title = title;
        this.location = location;
        this.description = JSON.stringify(description);
        this.minYearsWorkExp = minYearsWorkExp;

        return this;
    }

    getDescriptionPlainText(): string {
        if (!this.description) {
            return "";
        }

        const { blocks = [] } = JSON.parse(this.description) as RawDraftContentState;
        const nonEmptyBlockTexts = blocks.map(block => block?.text?.trim() || "")
            .filter(text => text != "");

        return nonEmptyBlockTexts.join(" ");
    }

    generateKeywords(employmentType: EmploymentType, skills: Skill[]) : void {
        const skillNames = skills.map(skill => skill.name.trim().toLowerCase())
            .join(" ");
        const typeName = employmentType.name.trim().toLocaleLowerCase();

        let keywords: string[] = [];

        keywords.push(this.title.trim().toLocaleLowerCase());
        keywords.push(this.location.trim().toLocaleLowerCase());

        if (typeName) {
            keywords.push(typeName);
        }

        if (skillNames) {
            keywords.push(skillNames);
        }

        keywords = [
            ...keywords,
            ...keywordExtractor.extract(this.getDescriptionPlainText(), {
                language: "english",
                remove_digits: true,
                return_changed_case: true,
            })
        ];

        this.keywords = uniq(keywords).join(" ");
    }
}
