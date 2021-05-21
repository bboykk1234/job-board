import React, { useEffect, useState } from "react";
import { JobFormFieldValues, EmploymentType } from "../../@types";
import { UseFormRegister } from "react-hook-form";
import axios from "axios";
import useLoading from "../hooks/useLoading";

type Props = {
    register: UseFormRegister<JobFormFieldValues>
}

export default function EmploymentTypeSelect({ register }: Props) {
    const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([])
    const { isLoading, setIsLoading } = useLoading();

    useEffect(() => {
        loadEmploymentTypes();
    }, []);

    async function loadEmploymentTypes() {
        try {
            const { data } = await axios.get<EmploymentType[]>("/employment_types");
            setEmploymentTypes(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return isLoading
        ? <div>Loading...</div>
        : (
            <>
                <label htmlFor="employment-types" className="form-label">Employment Type</label>
                <select className="form-control" id="employment-types" {...register("employmentTypeId", { required: true, valueAsNumber: true })} >
                    {
                        employmentTypes.map(({ id, name }) => (
                            <option value={id} key={id}>{name}</option>
                        ))
                    }
                </select>
            </>

        );

}