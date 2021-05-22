import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { JobFormFieldValues, Skill } from "../../@types";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from 'react-select/async';
import axios from "axios";
import EmploymentTypeSelect from "./EmploymentTypeSelect";

export default function JobForm() {
    const { register, handleSubmit, control } = useForm<JobFormFieldValues>({
        defaultValues: {
            description: { blocks: [], entityMap: {} }
        }
    });

    async function onSubmit(values: JobFormFieldValues) {
        try {
            const skills = values.skills || [];
            delete values.skills;
            const { data } = await axios.post("/jobs", {
                ...values,
                skillIds: skills.map(skill => skill.id),
            });

            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    function loadSkillList(input: string) {
        return axios.get<Skill[]>("skills", { params: { start: input } })
            .then(data => data.data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" {...register("title", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" className="form-control" id="location" {...register("location", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <EmploymentTypeSelect register={register} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="min-years-work-exp">Work Experience</label>
                <input type="number" className="form-control" id="min-years-work-exp" {...register("minYearsWorkExp", { required: true, valueAsNumber: true })} />
            </div>
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
                            <AsyncSelect
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
                            <Editor
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                initialContentState={value}
                                onContentStateChange={onChange}
                            />
                            {error && <div>{error.message}</div>}
                        </>
                    );
                }}
            />

            <button type="submit" className="btn btn-primary">Post</button>
        </form>
    );
}