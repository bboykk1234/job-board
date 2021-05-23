import React, { useEffect, useState } from "react";
import { JobFormFieldValues, JobFunction } from "../../@types";
import { Control, Controller } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

const JobFunctionSelect: React.FC<{control: Control<JobFormFieldValues>}> = ({ control }) => {
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
        ? <div>Loading...</div>
        : (
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
                                    <label className="form-label" htmlFor="job-functions">Job Function</label>
                                    <Select
                                        id="job-functions"
                                        isSearchable
                                        getOptionLabel={e => e.name}
                                        getOptionValue={e => e.id.toString()}
                                        options={jobFunctions}
                                        placeholder="Type to filter"
                                        onChange={onChange}
                                    />
                                    {error && <div>{error.message}</div>}
                                </>
                            );
                        }}
                    />
        );
}

export default JobFunctionSelect;