import React, { useEffect, useState } from "react";
import { CountryResponseModel, JobApplicationFormFieldValues } from "../@types";
import { Controller, Control, UseFormRegister } from "react-hook-form";
import axios from "axios";
import Select from "react-select";
import LoadSpinner from "./LoadSpinner";

const PhoneInput: React.FC<{
  control: Control<JobApplicationFormFieldValues>,
  register: UseFormRegister<JobApplicationFormFieldValues>,
  list?: CountryResponseModel[]
}> = ({ control, list, register }) => {
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

  return (
    <>
      <label className="form-label w-100" htmlFor="phone.number">Phone Number<span className="text-danger">*</span></label>
      <div className="d-flex">
        {isLoading
          ? (
            <LoadSpinner />
          ) : (
            <Controller
              control={control}
              name="phone.country"
              rules={{
                required: {
                  value: true,
                  message: "Field cannot be empty",
                },
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <>
                    <Select
                      id="phone.country"
                      isSearchable
                      value={value}
                      className="w-25 rounded-end-0"
                      classNamePrefix="phone-code-select"
                      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      menuPortalTarget={document.body}
                      getOptionLabel={e => e.phoneCode.toString()}
                      getOptionValue={e => e.id.toString()}
                      options={countries}
                      placeholder=""
                      onChange={onChange}
                    />
                  </>
                );
              }}
            />
          )
        }
        <input type="text" className="form-control w-auto flex-grow-1 rounded-start-0 border-start-0" id="phone.number" {...register("phone.number", {
          required: {
            value: true,
            message: "Field cannot be empty"
          }, maxLength: {
            value: 20,
            message: "Value is too long"
          }
        })} />
      </div>
    </>
  )
}

export default PhoneInput;
