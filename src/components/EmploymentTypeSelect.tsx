import React, { useEffect, useState } from "react";
import { EmploymentType, JobFormFieldValues } from "../../@types";
import { Controller, Control, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

const EmploymentTypeSelect: React.FC<{ control: Control<JobFormFieldValues>, setValue: UseFormSetValue<JobFormFieldValues>, getValues: UseFormGetValues<JobFormFieldValues> }> = ({ control, setValue, getValues }) => {
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
                render={({ field: { value, onChange }, fieldState: { error } }) => {
                    return (
                        <>
                            <label className="form-label" htmlFor="employment_types">Employment Type</label>
                            <Select
                                id="employment_types"
                                isSearchable
                                value={value}
                                getOptionLabel={e => e.name}
                                getOptionValue={e => e.id.toString()}
                                options={employmentTypes}
                                placeholder="Type to filter"
                                onChange={value => {
                                    const levelValue = getValues("level");
                                    const { name } = value as EmploymentType;
                                    onChange(value)
                                    if (name == "Internship") {
                                        setValue("level", {
                                            id: 1,
                                            name: "Internship",
                                        });
                                        return;
                                    }

                                    if (levelValue?.name == "Internship") {
                                        setValue("level", null);
                                    }
                                }}
                            />
                            {error && <div>{error.message}</div>}
                        </>
                    );
                }}
            />
        );
}

export default EmploymentTypeSelect;