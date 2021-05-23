import React, { useEffect, useState } from "react";
import { JobFormFieldValues, Level } from "../../@types";
import { Control, Controller } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

const LevelSelect: React.FC<{control: Control<JobFormFieldValues>}> = ({ control }) => {
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
                        render={({ field: { onChange }, fieldState: { error } }) => {
                            return (
                                <>
                                    <label className="form-label" htmlFor="levels">Levels</label>
                                    <Select
                                        id="levels"
                                        isSearchable
                                        getOptionLabel={e => e.name}
                                        getOptionValue={e => e.id.toString()}
                                        options={levels}
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

export default LevelSelect;