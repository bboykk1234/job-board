import React, { useEffect, useState } from "react";
import { JobFormFieldValues, Level } from "../../@types";
import { Controller, Control, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

const LevelSelect: React.FC<{ control: Control<JobFormFieldValues>, setValue: UseFormSetValue<JobFormFieldValues>, getValues: UseFormGetValues<JobFormFieldValues> }> = ({ control, setValue, getValues }) => {
    const [levels, setLevels] = useState<Level[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadLevels() {
            try {
                const { data } = await axios.get<Level[]>("/levels");
                setLevels(data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        loadLevels();
    }, []);

    return isLoading
        ? <div>Loading...</div>
        : (
            <Controller
                control={control}
                name="level"
                rules={{
                    required: {
                        value: true,
                        message: "Please select a seniority level",
                    },
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => {
                    return (
                        <>
                            <label className="form-label" htmlFor="levels">Levels<span className="text-danger">*</span></label>
                            <Select
                                id="levels"
                                isSearchable
                                value={value}
                                getOptionLabel={e => e.name}
                                getOptionValue={e => e.id.toString()}
                                options={levels}
                                placeholder="Type to filter"
                                onChange={value => {
                                    const typeValue = getValues("employmentType");
                                    const { name } = value as Level;
                                    onChange(value)
                                    if (name == "Internship") {
                                        setValue("employmentType", {
                                            id: 1,
                                            name: "Internship",
                                        });
                                        return;
                                    }

                                    if (typeValue?.name == "Internship") {
                                        setValue("employmentType", null);
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

export default LevelSelect;