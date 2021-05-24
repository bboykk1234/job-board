import React, { useEffect, useState } from "react";
import { JobFormFieldValues, JobFunction } from "../../@types";
import { Control, Controller } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

const JobFunctionSelect: React.FC<{ control: Control<JobFormFieldValues> }> = ({ control }) => {
    const [jobFunctions, setJobFunctions] = useState<JobFunction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadJobFunctions() {
            try {
                const { data } = await axios.get<JobFunction[]>("/job_functions");
                setJobFunctions(data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        loadJobFunctions();
    }, []);

    return isLoading
        ? (
            <div className="text-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : (
            <Controller
                control={control}
                name="jobFunction"
                rules={{
                    required: {
                        value: true,
                        message: "Please select a job function",
                    },
                }}
                render={({ field: { onChange }, fieldState: { error } }) => {
                    return (
                        <>
                            <label className="form-label d-inline-flex align-items-center" htmlFor="job-functions">Job Function<span className="text-danger">*</span></label>
                            <Select
                                id="job-functions"
                                isSearchable
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                menuPortalTarget={document.body}
                                getOptionLabel={e => e.name}
                                getOptionValue={e => e.id.toString()}
                                options={jobFunctions}
                                placeholder="Type to filter"
                                onChange={onChange}
                            />
                        </>
                    );
                }}
            />
        );
}

export default JobFunctionSelect;