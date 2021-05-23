import { RawDraftContentState } from "draft-js";
import { Control } from "react-hook-form";

export interface User {
    id: number,
    username: string,
    createdAt: string,
    updatedAt: string
}

export interface UserProfile extends User {};

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

export interface JobModel {
    id: number,
    creator?: User,
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
    createdAt: Date,
    updatedAt: Date,
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

export interface EmploymentTypeModel extends ModelBase,EmploymentType {}

export interface Level {
    id: number,
    name: string,
}

export interface LevelModel extends ModelBase,Level {}

export interface JobFunction {
    id: number,
    name: string,
}

export interface JobFunctionModel extends ModelBase, JobFunction {}

export interface Skill extends EmploymentType { };

export type JobsCategorizedByJobFunction = {
    [key: string]: JobModel[],
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