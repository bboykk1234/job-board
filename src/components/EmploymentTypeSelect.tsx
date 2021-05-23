import React, { useEffect, useState } from "react";
import { EmploymentType, JobFormFieldValues } from "../../@types";
import { Controller, Control } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

const EmploymentTypeSelect: React.FC<{control: Control<JobFormFieldValues>}> = ({ control }) => {
    const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadEmploymentTypes() {
            try {
                const { data } = await axios.get<EmploymentType[]>("/employment_types");
                setEmploymentTypes(data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        loadEmploymentTypes();
    }, []);

    return isLoading
        ? <div>Loading...</div>
        : (
            <Controller
                        control={control}
                        name="employmentType"
                        rules={{
                            required: {
                                value: true,
                                message: "Please select an employment type",
                            },
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) => {
                            return (
                                <>
                                    <label className="form-label" htmlFor="employment_types">Employment Type</label>
                                    <Select
                                        id="employment_types"
                                        isSearchable
                                        getOptionLabel={e => e.name}
                                        getOptionValue={e => e.id.toString()}
                                        options={employmentTypes}
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

export default EmploymentTypeSelect;