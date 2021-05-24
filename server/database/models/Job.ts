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
import { Level } from "./Level";
import { JobFunction } from "./JobFunction";

@Entity({ name: "jobs" })
export class Job extends Base {

    @Column({
        unsigned: true,
        name: "creator_id"
    })
    creatorId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "creator_id" })
    creator?: User

    @Column({
        length: 255,
    })
    title!: string;

    @Column({
        type: "text",
        // select: false
    })
    description!: string;

    @Column({
        type: "text",
        select: false
    })
    @Index({
        fulltext: true,
    })
    keywords!: string;

    @Column({
        length: 255
    })
    location!: string;

    @Column({
        name: "employment_type_id",
        unsigned: true,
    })
    employmentTypeId!: number;

    @Column({
        name: "level_id",
        unsigned: true,
    })
    levelId!: number;

    @Column({
        name: "job_function_id",
        unsigned: true,
    })
    jobFunctionId!: number;

    @ManyToOne(() => EmploymentType)
    @JoinColumn({ name: "employment_type_id", referencedColumnName: "id" })
    employmentType?: EmploymentType;

    @ManyToOne(() => Level)
    @JoinColumn({ name: "level_id", referencedColumnName: "id" })
    level?: Level;

    @ManyToOne(() => JobFunction)
    @JoinColumn({ name: "job_function_id", referencedColumnName: "id" })
    jobFunction?: JobFunction;

    @OneToMany(() => JobSkill, jobSkill => jobSkill.job)
    jobSkillPivot?: JobSkill[];

    skills?: Skill[];

    static populateViaPostReq(req: ValidatedRequest<SaveJobRequestSchema>): Job {
        const { title, location, description, employmentTypeId, levelId, jobFunctionId } = req.body;

        const job = new Job();
        job.title = title;
        job.location = location;
        job.description = description;
        job.keywords = "";
        job.employmentTypeId = employmentTypeId;
        job.levelId = levelId
        job.jobFunctionId = jobFunctionId;
        job.creator = req.user as User;

        return job;
    }

    populateViaPutReq(req: ValidatedRequest<SaveJobRequestSchema>): Job {
        const { title, location, employmentTypeId, description, levelId, jobFunctionId } = req.body;

        if (this.employmentTypeId != employmentTypeId) {
            this.employmentTypeId = employmentTypeId;
        }

        if (this.levelId != levelId) {
            this.levelId = levelId;
        }

        if (this.jobFunctionId != jobFunctionId) {
            this.jobFunctionId = jobFunctionId;
        }

        this.title = title;
        this.location = location;
        this.description = JSON.stringify(description);

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
