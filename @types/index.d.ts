import { RawDraftContentState } from "draft-js";
import { Control } from "react-hook-form";

export interface User {
    id: number,
    username: string,
    createdAt: string,
    updatedAt: string
}

export interface UserModel extends ModelBase {
    username: string,
}

export interface UserProfile extends User { };

export interface Job {
    id: number,
    creator: UserProfile,
    title: string,
    description: string,
    location: string,
    minYearsWorkExp: number,
    employmentTypeId: number,
    descEditorContent?: RawDraftContentState
}

export interface ListJobResponseSchema extends Omit<JobModel, "description" | "minYearsWorkExp" | "level" | "employmentType"> { }

export interface GetJobResponseSchema extends Omit<JobModel, "createdAt" | "updatedAt" | "employmentType" | "level" | "jobFunction"> {
    createdAt: string,
    updatedAt: string
    employmentType: EmploymentType
    level: Level
    jobFunction: JobFunction
}

export interface GetJobResponseState extends GetJobResponseSchema {
    descEditorContent: RawDraftContentState
}

export interface JobModel extends ModelBase {
    creator?: UserModel,
    creatorId: number,
    title: string,
    description: string,
    location: string,
    minYearsWorkExp?: number | null,
    employmentTypeId: number,
    levelId: number,
    jobFunctionId: number,
    employmentType?: EmploymentType
    level?: Level
    jobFunction?: JobFunction
}

export interface JobSkillModelWithSkill extends ModelBase {
    skillId: number,
    jobId: number,
    skill: Skill,
}

export interface JobModelWithSkill extends JobModel {
    jobSkillPivot: JobSkillModelWithSkill[]
}

export interface JobApplicationModelWithSkills extends JobApplicationModel {
    job: JobModelWithSkill,
}

export interface ListJobApplicationResponseSchema extends Omit<JobApplicationModel, "job"> {
    job: GetJobResponseSchema,
}

export interface JobApplicationModel extends ModelBase, JobApplication {
    job: JobModel,
}

export interface JobApplication {
    id: number,
    jobId: number,
    firstName: string,
    lastName: number,
    email: string,
    phoneNumber: number,
    address: string,
    city: string,
    province: string,
    postalCode: string,
    country: string,
}

export interface ModelBase {
    id: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface EmploymentType {
    id: number,
    name: string,
}

export interface EmploymentTypeModel extends ModelBase, EmploymentType { }

export interface Level {
    id: number,
    name: string,
}

export interface LevelModel extends ModelBase, Level { }

export interface JobFunction {
    id: number,
    name: string,
}

export interface JobFunctionModel extends ModelBase, JobFunction { }

export interface Skill extends EmploymentType { };

export type ListJobsCategorizedByJobFunctionResponseSchema = {
    [key: string]: ListJobResponseSchema[],
}

export interface LoginFormFieldValues {
    username: string,
    password: string,
}

export type LoginFn = ({ username, password }: LoginFormFieldValues) => Promise<void>;

export type NoArgsVoidFn = () => void;

export type UserContext = {
    user: UserProfile | null,
    isLoggedIn: boolean | null,
    login: LoginFn,
    logout: NoArgsVoidFn,
}

export type JobFormFieldValues = {
    title: string,
    location: string,
    employmentType: EmploymentType | null,
    level: Level | null,
    jobFunction: JobFunction,
    minYearsWorkExp?: number,
    description: RawDraftContentState,
    skills: Skill[]
}

export interface JobApplicationFormFieldValues extends JobApplication {
    resume: FileList,
}

export type JobApplicationFormFieldKeys = keyof JobApplicationFormFieldValues;

export type EditorProps = {
    control: Control<JobFormFieldValues>,
}