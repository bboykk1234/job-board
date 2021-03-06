import React, { useEffect, useState } from "react";
import { JobFormFieldValues, LevelResponseModel } from "../@types";
import { Controller, Control, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

const LevelSelect: React.FC<{ control: Control<JobFormFieldValues>, setValue: UseFormSetValue<JobFormFieldValues>, getValues: UseFormGetValues<JobFormFieldValues> }> = ({ control, setValue, getValues }) => {
    const [levels, setLevels] = useState<LevelResponseModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadLevels() {
            try {
                const { data } = await axios.get<LevelResponseModel[]>("/levels");
                setLevels(data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        loadLevels();
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
                            <label className="form-label d-inline-flex align-items-center" htmlFor="levels">Levels<span className="text-danger">*</span></label>
                            <Select
                                id="levels"
                                isSearchable
                                value={value}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                menuPortalTarget={document.body}
                                getOptionLabel={e => e.name}
                                getOptionValue={e => e.id.toString()}
                                options={levels}
                                placeholder="Type to filter"
                                onChange={value => {
                                    const typeValue = getValues("employmentType");
                                    const { name } = value as LevelResponseModel;
                                    onChange(value)
                                    if (name === "Internship") {
                                        setValue("employmentType", {
                                            id: 1,
                                            name: "Internship",
                                        });
                                        return;
                                    }

                                    if (typeValue?.name === "Internship") {
                                        setValue("employmentType", null);
                                    }
                                }}
                            />
                        </>
                    );
                }}
            />
        );
}

export default LevelSelect;
