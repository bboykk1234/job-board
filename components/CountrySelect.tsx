import React, { useEffect, useState } from "react";
import { CountryResponseModel, JobApplicationFormFieldValues } from "../@types";
import { Controller, Control } from "react-hook-form";
import axios from "axios";
import Select from "react-select";
import LoadSpinner from "./LoadSpinner";

const CountrySelect: React.FC<{
  control: Control<JobApplicationFormFieldValues>,
  list?: CountryResponseModel[]
}> = ({ control, list }) => {
  const [countries, setCountries] = useState<CountryResponseModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (list) {
      return
    }

    async function loadCountries() {
      try {
        const { data } = await axios.get<CountryResponseModel[]>("/countries");
        setCountries(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    loadCountries();
  }, []);

  return isLoading
    ? (
      <LoadSpinner />
    ) : (
      <Controller
        control={control}
        name="country"
        rules={{
          required: {
            value: true,
            message: "Field cannot be empty",
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <>
              <label className="form-label d-inline-flex align-items-center" htmlFor="country">Country<span className="text-danger">*</span></label>
              <Select
                id="country"
                isSearchable
                value={value}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                getOptionLabel={e => e.name}
                getOptionValue={e => e.id.toString()}
                options={countries}
                placeholder="Type to filter"
                onChange={onChange}
              />
            </>
          );
        }}
      />
    );
}

export default CountrySelect;
