import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { JobFormFieldValues, Skill } from "../../@types";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from 'react-select/async';
import axios from "axios";
import EmploymentTypeSelect from "./EmploymentTypeSelect";
import { useHistory } from "react-router";
import FormContainer from "./FormContainer";
import LevelSelect from "./LevelSelect";
import JobFunctionSelect from "./JobFunctionSelect";
import { useState } from "react";
import FormFieldErrorMessage from "./FormFieldErrorMessage";
import { ErrorMessage } from "@hookform/error-message";

export default function JobForm() {
    const history = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm<JobFormFieldValues>({
        mode: "onBlur",
    });

    async function onSubmit(values: JobFormFieldValues) {
        setIsSubmitting(true);
        try {
            // By pass type error, it should not be empty form validated
            if (!(values.employmentType && values.level && values.jobFunction)) {
                return;
            }

            const {
                employmentType: { id: employmentTypeId },
                level: { id: levelId },
                jobFunction: { id: jobFunctionId },
                title,
                location,
                skills,
                description,
            } = values;

            await axios.post("/jobs", {
                title,
                location,
                levelId,
                employmentTypeId,
                jobFunctionId,
                description: JSON.stringify(description),
                skillIds: skills.map(skill => skill.id),
            });
            history.push("/jobs/created");
        } catch (err) {
            console.log(err);
        }
        setIsSubmitting(false);
    }

    function loadSkillList(input: string) {
        return axios.get<Skill[]>("skills", { params: { search: input } })
            .then(data => data.data);
    }

    return (
        <FormContainer>
            <h4 className="mb-3 text-center">New Job Opening</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label d-inline-flex align-items-center">Title<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="title" {...register("title", {
                        required: {
                            value: true,
                            message: "Field cannot be empty"
                        }, maxLength: {
                            value: 255,
                            message: "Title is too long"
                        }
                    })} />
                    <ErrorMessage errors={errors} name="title" as={FormFieldErrorMessage} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label d-inline-flex align-items-center">Location<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="location" {...register("location", {
                        required: {
                            value: true,
                            message: "Field cannot be empty"
                        }, maxLength: {
                            value: 255,
                            message: "Value is too long"
                        }
                    })} />
                    <ErrorMessage errors={errors} name="location" as={FormFieldErrorMessage} />
                </div>
                <div className="mb-3 row">
                    <div className="col-6">
                        <EmploymentTypeSelect control={control} setValue={setValue} getValues={getValues} />
                        <ErrorMessage errors={errors} name="employmentType" as={FormFieldErrorMessage} />
                    </div>
                    <div className="col-6">
                        <LevelSelect control={control} setValue={setValue} getValues={getValues} />
                        <ErrorMessage errors={errors} name="level" as={FormFieldErrorMessage} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-12">
                        <JobFunctionSelect control={control} />
                        <ErrorMessage errors={errors} name="jobFunction" as={FormFieldErrorMessage} />
                    </div>
                </div>
                <div className="mb-3">
                    <Controller
                        control={control}
                        name="skills"
                        rules={{
                            required: {
                                value: true,
                                message: "Field cannot be empty",
                            },
                        }}
                        render={({ field: { value, onChange }, fieldState: { error } }) => {
                            return (
                                <>
                                    <label className="form-label d-inline-flex align-items-center" htmlFor="skills-select">Skills<span className="text-danger">*</span></label>
                                    <AsyncSelect
                                        id="skills-select"
                                        isMulti
                                        hideSelectedOptions
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        menuPortalTarget={document.body}
                                        placeholder="Type to search for skill(s)..."
                                        value={value}
                                        getOptionLabel={e => e.name}
                                        getOptionValue={e => e.id.toString()}
                                        defaultOptions={[]}
                                        loadOptions={loadSkillList}
                                        onChange={onChange}
                                    />
                                </>
                            );
                        }}
                    />
                    <ErrorMessage errors={errors} name="skills" as={FormFieldErrorMessage} />
                </div>

                <div className="mb-3">
                    <Controller
                        control={control}
                        name="description"
                        rules={{
                            validate: {
                                hasText: value => {
                                    if (!value || !convertFromRaw(value).hasText()) {
                                        return "Field cannot be empty";
                                    }
                                    return true
                                },
                            }
                        }}
                        render={({ field: { value, onChange }, fieldState: { error }, formState }) => {
                            return (
                                <>
                                    <label className="form-label d-inline-flex align-items-center" htmlFor="rdw-wrapper-666">Job Description<span className="text-danger">*</span></label>
                                    <Editor
                                        wrapperId={666}
                                        wrapperClassName="editor-wrapper"
                                        editorClassName="editor-main"
                                        toolbarClassName="editor-toolbar"
                                        initialContentState={value}
                                        onContentStateChange={onChange}
                                        toolbar={{
                                            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link'],
                                            inline: {
                                                options: ['bold', 'italic', 'underline', 'strikethrough'],
                                            },
                                            blockType: {
                                                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
                                            },
                                        }}
                                    />
                                </>
                            );
                        }}
                    />
                    <ErrorMessage errors={errors} name="description" as={FormFieldErrorMessage} />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    Create
                </button>
            </form>
        </FormContainer>
    );
}