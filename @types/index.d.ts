import { RawDraftContentState } from "draft-js";
import { EditorState } from "react-draft-wysiwyg";
import { Control } from "react-hook-form";

export interface UserLogin {
    username: string,
    password: string,
}

export interface UserProfile {
    id: number,
    username: string,
    createdAt: string,
    updatedAt: string
}

export interface Job {
    id: number,
    creator: UserProfile,
    title: string,
    description: string,
    location: string,
    minYearsWorkExp: number,
    employmentTypeId: number,
}

export interface EmploymentType {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
}

export interface Skill extends EmploymentType {};

export type LoginFn = ({username, password}: UserLogin) => Promise<void>;

export type NoArgsVoidFn = () => void;

export type UserContext = {
    user: UserProfile | null,
    isLoggedIn: boolean | null,
    login: LoginFn,
    logout: NoArgsVoidFn,
}

export type LoginFormProps = {
    onLogin: LoginFn,
}

export type JobFormFieldValues = {
    title:string,
    location: string,
    employmentTypeId?: number,
    minYearsWorkExp?: number,
    description: RawDraftContentState
}

export type EditorProps = {
    control: Control<JobFormFieldValues>,
}