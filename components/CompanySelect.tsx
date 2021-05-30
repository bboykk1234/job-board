import React, { useEffect, useState } from "react";
import { CompanyResponseModel, JobFormFieldValues } from "../@types";
import { Controller, Control } from "react-hook-form";
import axios from "axios";
import Select from "react-select";

const CompanySelect: React.FC<{ control: Control<JobFormFieldValues> }> = ({ control}) => {
    const [companies, setCompanies] = useState<CompanyResponseModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadCompanies() {
            try {
                const { data } = await axios.get<CompanyResponseModel[]>("/companies");
                setCompanies(data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        loadCompanies();
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
                name="company"
                rules={{
                    required: {
                        value: true,
                        message: "Field cannot be empty",
                    },
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => {
                    return (
                        <>
                            <label className="form-label d-inline-flex align-items-center" htmlFor="companies">Company<span className="text-danger">*</span></label>
                            <Select
                                id="companies"
                                isSearchable
                                value={value}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                menuPortalTarget={document.body}
                                getOptionLabel={e => e.name}
                                getOptionValue={e => e.id.toString()}
                                options={companies}
                                placeholder="Type to filter"
                                onChange={onChange}
                            />
                        </>
                    );
                }}
            />
        );
}

export default CompanySelect;
