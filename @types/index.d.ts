import { RawDraftContentState } from "draft-js";
import { Control } from "react-hook-form";
import { NextApiRequest } from "next";
import { Options, File, Files } from "formidable";

export interface ResponseModelBase {
  id: number,
  createdAt: string,
  updatedAt: string
}
export interface ModelBase {
  id: number,
  createdAt: Date,
  updatedAt: Date,
}

export interface UserResponseModel extends ResponseModelBase {
  username: string,
}
export interface EmploymentTypeResponseModel extends ResponseModelBase {
  id: number,
  name: string,
}
export interface SkillResponseModel extends ResponseModelBase {
  id: number,
  name: string,
}
export interface LevelResponseModel extends ResponseModelBase {
  id: number,
  name: string,
}
export interface JobFunctionResponseModel extends ResponseModelBase {
  id: number,
  name: string,
}
export interface CompanyResponseModel extends ResponseModelBase {
  id: number,
  name: string,
}
export interface CountryResponseModel extends ResponseModelBase {
  isoCode: string,
  iso3Code: string,
  phoneCode: number,
  name: string,
}
export interface JobResponseModel extends ResponseModelBase, JobModelCommonFields, JobResponseModelRelationFields { }
export interface JobResponseLoadedRelationsModel extends ResponseModelBase, JobModelCommonFields, JobResponseModelLoadedRelationFields { }
export interface JobApplicationResponseModel extends ResponseModelBase, JobApplicationCommonFields, JobApplicationResponseModelRelationFields { }

export interface JobApplicationCommonFields {
  jobId: number
  firstName: string
  lastName: string
  email: string
  phoneId: number
  phoneNumber: string
  address: string
  city: string
  province: string
  postalCode: string
  countryId: number
}
export interface JobModelCommonFields {
  creatorId: number,
  title: string,
  description: string,
  location: string,
  employmentTypeId: number,
  levelId: number,
  jobFunctionId: number,
  companyId: number
}
export interface JobApplicationResponseModelRelationFields {
  job?: JobResponseModel,
  country?: CountryResponseModel
  phoneCountry?: CountryResponseModel
}
export interface JobResponseModelRelationFields {
  creator?: UserResponseModel,
  employmentType?: EmploymentTypeResponseModel
  level?: LevelResponseModel
  jobFunction?: JobFunctionResponseModel
  company?: CompanyResponseModel
  skills?: SkillResponseModel[]
}
export interface JobResponseModelLoadedRelationFields {
  creator: UserResponseModel,
  employmentType: EmploymentTypeResponseModel
  level: LevelResponseModel
  jobFunction: JobFunctionResponseModel
  company: CompanyResponseModel
  skills: SkillResponseModel[]
}

export interface UserModel extends ModelBase {
  username: string,
}
export interface EmploymentTypeModel extends ModelBase {
  id: number,
  name: string,
}
export interface SkillModel extends ModelBase {
  id: number,
  name: string,
}
export interface LevelModel extends ModelBase {
  id: number,
  name: string,
}
export interface JobFunctionModel extends ModelBase {
  id: number,
  name: string,
}
export interface CompanyModel extends ModelBase {
  id: number,
  name: string,
}
export interface CountryModel extends ModelBase {
  isoCode: string,
  iso3Code: string,
  phoneCode: number,
  name: string,
}
export interface JobModel extends ResponseModelBase, JobModelCommonFields, JobModelRelationFields { }
export interface JobLoadedRelationsModel extends ResponseModelBase, JobModelCommonFields, JobLoadedRelationsModel { }
export interface JobApplicationModel extends ModelBase, JobApplicationCommonFields, JobApplicationModelRelationFields { }
export interface JobApplicationLoadedRelationsModel extends ModelBase, JobApplicationCommonFields, JobApplicationModelLoadedRelationFields { }

export interface JobModelRelationFields {
  creator?: UserModel,
  employmentType?: EmploymentTypeModel
  level?: LevelModel
  jobFunction?: JobFunctionModel
  company?: CompanyModel
  skills?: SkillModel[]
}
export interface JobModelLoadedRelationFields {
  creator: UserModel,
  employmentType: EmploymentTypeModel
  level: LevelModel
  jobFunction: JobFunctionModel
  company: CompanyModel
  skills: SkillModel[]
}
export interface JobApplicationModelRelationFields {
  job?: JobModel,
  country?: CountryModel
  phoneCountry?: CountryModel
}
export interface JobApplicationModelLoadedRelationFields {
  job: JobModel,
  country: CountryModel
  phoneCountry: CountryModel
}

export interface UserProfile extends UserResponseModel { }


export interface ListJobResponseSchema extends Omit<JobResponseModel, "description" | "level" | "employmentType"> { }

export interface ListJobsResponseSchema {
  results: ListJobResponseModel[],
  total: number,
}

export interface GetJobResponseSchema extends JobResponseModel {
  creator: UserModel,
  employmentType: EmploymentType
  level: Level
  jobFunction: JobFunction
  company: Company
  skills: Skill[]
}

export interface GetJobResponseState extends GetJobResponseSchema {
  descEditorContent: RawDraftContentState
}

export interface JobApplicationResponseModelWithSkills extends JobApplicationLoadedRelationsModel {
  job: JobResponseLoadedRelationsModel,
}

export interface ListJobApplicationResponseSchema extends Omit<JobApplicationModel, "job"> {
  job: GetJobResponseSchema,
}
export interface CountryResponseModel extends ResponseModelBase {
  isoCode: string,
  iso3Code: string,
  phoneCode: number,
  name: string,
}

export type ListJobsCategorizedByJobFunctionResponseSchema = {
  [key: string]: ListJobResponseModel[],
}

export interface LoginFormFieldValues {
  username: string,
  password: string,
}

export type LoginFn = ({ username, password }: LoginFormFieldValues) => Promise<boolean>;

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
  company: Company | null,
  employmentType: EmploymentType | null,
  level: Level | null,
  jobFunction: JobFunction,
  description: RawDraftContentState,
  skills: Skill[]
}

interface CountryResponseModelWithErrorMessage extends CountryResponseModel {
  message?: string,
}

export interface JobApplicationFormFieldValues extends JobApplicationResponseModel {
  country: CountryResponseModel,
  phone: {
    number: string,
    country: CountryResponseModelWithErrorMessage
  }
  resume: FileList,
}

export type JobApplicationFormFieldKeys = keyof JobApplicationFormFieldValues;

export type EditorProps = {
  control: Control<JobFormFieldValues>,
}

export interface NextApiRequestWithId extends NextApiRequest {
  params: {
    id: string
  }
}

export interface NextApiAuthRequest extends NextApiRequest {
  user: User,
}

export type ValidatedRequestSchema = Record<ContainerTypes, any>

export interface CreateJobApplicationRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: JobApplicationCommonFields
}

export enum ContainerTypes {
  Body = 'body',
  Query = 'query',
  Headers = 'headers',
  Fields = 'fields',
  Params = 'params'
}

export interface ValidatedAuthRequest<T extends ValidatedRequestSchema>
  extends NextApiAuthRequest {
  body: T[ContainerTypes.Body]
  query: T[ContainerTypes.Query]
  headers: T[ContainerTypes.Headers]
  params: T[ContainerTypes.Params]
}

export interface ValidatedRequest<T extends ValidatedRequestSchema> extends Omit<ValidatedAuthRequest, "user"> { }

export interface ValidatedRequestWithFiles<T extends ValidatedRequestSchema> extends Omit<ValidatedRequest, "user">, NextApiRequestWithFiles { }

export interface NextApiRequestWithFiles extends NextApiRequest {
  file: File | File[]
  files: Files
}

export interface SaveJobRequestBody extends JobModelCommonFields {
  skillIds: number[],
}

export interface SaveJobRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: SaveJobRequestBody
}

export interface validationOptions extends Options {
  single: string,
}

export interface PageLoadingContext {
  isPageLoading: boolean,
  setIsPageLoading: React.Dispatch<SetStateAction<boolean>>
}

export interface ApiPaginationResponse<T extends {}> {
  results: T[]
  total: number
}
