import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { JobFormFieldValues, Skill } from "../../@types";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from 'react-select/async';
import axios from "axios";
import EmploymentTypeSelect from "./EmploymentTypeSelect";
import { useHistory } from "react-router";
import { useEffect } from "react";
import FormContainer from "./FormContainer";
import LevelSelect from "./LevelSelect";
import JobFunctionSelect from "./JobFunctionSelect";

export default function JobForm() {
    const history = useHistory();
    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm<JobFormFieldValues>({
        defaultValues: {
            description: { blocks: [], entityMap: {} }
        }
    });

    async function onSubmit(values: JobFormFieldValues) {
        try {
            // By pass type error, it should not be empty form validated
            if (!(values.employmentType && values.level && values.jobFunction)) {
                return;
            }

            const {
                employmentType: { id: employmentTypeId },
                level: { id: levelId },
                jobFunction: {id: jobFunctionId},
                title,
                location,
                skills,
                minYearsWorkExp,
                description,
            } = values;

            await axios.post("/jobs", {
                title,
                location,
                minYearsWorkExp,
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
    }

    function loadSkillList(input: string) {
        return axios.get<Skill[]>("skills", { params: { start: input } })
            .then(data => data.data);
    }

    useEffect(() => {
        console.log(errors);

    }, [errors]);

    return (
        <FormContainer>
            <h4 className="mb-3 text-center">New Job Opening</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="title" {...register("title", { required: true, maxLength: 255 })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="location" {...register("location", { required: true, maxLength: 255 })} />
                </div>
                <div className="mb-3 row">
                    <div className="col-6">
                        <EmploymentTypeSelect control={control} setValue={setValue} getValues={getValues} />
                    </div>
                    <div className="col-6">
                        <LevelSelect control={control} setValue={setValue} getValues={getValues} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-6">
                        <JobFunctionSelect control={control} />
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="min-years-work-exp">Work Experience<span className="text-danger">*</span></label>
                        <input type="number" className="form-control" id="min-years-work-exp" {...register("minYearsWorkExp", { required: true, valueAsNumber: true })} />
                    </div>
                </div>
                <div className="mb-3">
                    <Controller
                        control={control}
                        name="skills"
                        rules={{
                            required: {
                                value: true,
                                message: "Please select the skills",
                            },
                        }}
                        render={({ field: { value, onChange }, fieldState: { error } }) => {
                            return (
                                <>
                                    <label className="form-label" htmlFor="skills-select">Skills<span className="text-danger">*</span></label>
                                    <AsyncSelect
                                        id="skills-select"
                                        isMulti
                                        hideSelectedOptions
                                        placeholder="Type to search for skill(s)..."
                                        value={value}
                                        getOptionLabel={e => e.name}
                                        getOptionValue={e => e.id.toString()}
                                        defaultOptions={[]}
                                        loadOptions={loadSkillList}
                                        onChange={onChange}
                                    />
                                    {error && <div>{error.message}</div>}
                                </>
                            );
                        }}
                    />
                </div>

                <div className="mb-3">
                    <Controller
                        control={control}
                        name="description"
                        rules={{
                            required: true, validate: {
                                hasText: value => convertFromRaw(value).hasText() || "Please fill up the Description",
                            }
                        }}
                        render={({ field: { value, onChange }, fieldState: { error }, formState }) => {
                            return (
                                <>
                                    <label className="form-label" htmlFor="rdw-wrapper-666">Job Description<span className="text-danger">*</span></label>
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
                                    {error && <div>{error.message}</div>}
                                </>
                            );
                        }}
                    />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Create</button>
            </form>
        </FormContainer>
    );
}