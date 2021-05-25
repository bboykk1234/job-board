import { JobApplicationFormFieldValues } from "../../@types";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormContainer from "./FormContainer";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import FormFieldErrorMessage from "./FormFieldErrorMessage";
import { ErrorMessage } from "@hookform/error-message";

export default function JobApplicationForm() {
    const history = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<JobApplicationFormFieldValues>({
        mode: "onBlur"
    });
    const { id: jobId } = useParams<{ id: string }>();

    async function onSubmit(values: JobApplicationFormFieldValues) {
        setIsSubmitting(true);
        try {
            let formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                if (key !== "resume") {
                    formData.append(key, value)
                }
            }
            formData.append("resume", values.resume.item(0) || "");
            formData.append("jobId", jobId);

            await axios.post(
                "/job_applications",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            history.push("/jobs/applied");
        } catch (err) {
            console.log(err);
        }
        setIsSubmitting(false);
    }

    return (
        <FormContainer>
            <Link className="text-decoration-none d-inline-flex align-items-center" to={`/jobs/${jobId}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg><span className="ps-1">Back</span></Link>
            <h4 className="mb-3 text-center">Job Application</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                    <div className="col-6">
                        <label htmlFor="lastName" className="form-label">Last Name<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="lastName" {...register("lastName", {
                            required: {
                                value: true,
                                message: "Field cannot be empty"
                            }, maxLength: {
                                value: 255,
                                message: "Value is too long"
                            }
                        })} />
                        <ErrorMessage errors={errors} name="lastName" as={FormFieldErrorMessage} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="firstName" className="form-label">First Name<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="firstName" {...register("firstName", {
                            required: {
                                value: true,
                                message: "Field cannot be empty"
                            }, maxLength: {
                                value: 255,
                                message: "Value is too long"
                            }
                        })} />
                        <ErrorMessage errors={errors} name="firstName" as={FormFieldErrorMessage} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email<span className="text-danger">*</span></label>
                    <input type="email" className="form-control" id="email" {...register("email", {
                        required: {
                            value: true,
                            message: "Field cannot be empty"
                        }, maxLength: {
                            value: 255,
                            message: "Value is too long"
                        }
                    })} />
                    <ErrorMessage errors={errors} name="email" as={FormFieldErrorMessage} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="phoneNumber">Phone Number<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="phoneNumber" {...register("phoneNumber", {
                        required: {
                            value: true,
                            message: "Field cannot be empty"
                        }, maxLength: {
                            value: 20,
                            message: "Value is too long"
                        }
                    })} />
                    <ErrorMessage errors={errors} name="phoneNumber" as={FormFieldErrorMessage} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="address">Address<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="address" {...register("address", {
                        required: {
                            value: true,
                            message: "Field cannot be empty"
                        }, maxLength: {
                            value: 255,
                            message: "Value is too long"
                        }
                    })} />
                    <ErrorMessage errors={errors} name="address" as={FormFieldErrorMessage} />
                </div>
                <div className=" row mb-3">
                    <div className="col-6">
                        <label className="form-label" htmlFor="city">City<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="city" {...register("city", {
                            required: {
                                value: true,
                                message: "Field cannot be empty"
                            }, maxLength: {
                                value: 30,
                                message: "Value is too long"
                            }
                        })} />
                        <ErrorMessage errors={errors} name="city" as={FormFieldErrorMessage} />
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="province">Province<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="province" {...register("province", {
                            required: {
                                value: true,
                                message: "Field cannot be empty"
                            }, maxLength: {
                                value: 30,
                                message: "Value is too long"
                            }
                        })} />
                        <ErrorMessage errors={errors} name="province" as={FormFieldErrorMessage} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <label className="form-label" htmlFor="postalCode">Postal Code<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="postalCode" {...register("postalCode", {
                            required: {
                                value: true,
                                message: "Field cannot be empty"
                            }, maxLength: {
                                value: 30,
                                message: "Value is too long"
                            }
                        })} />
                        <ErrorMessage errors={errors} name="postalCode" as={FormFieldErrorMessage} />
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="country">Country<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="country" {...register("country", {
                            required: {
                                value: true,
                                message: "Field cannot be empty"
                            }, maxLength: {
                                value: 50,
                                message: "Value is too long"
                            }
                        })} />
                        <ErrorMessage errors={errors} name="country" as={FormFieldErrorMessage} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume (Max 10MB, pdf only)<span className="text-danger">*</span></label>
                    <input className="form-control" type="file" id="resume" accept="application/pdf" {...register("resume", {
                        required: {
                            value: true,
                            message: "Field cannot be empty",
                        },
                        validate: {
                            minFileSize: value => (value.item(0)?.size as number) < 10485760 || "File more than 10MB"
                        }
                    })} />
                    <ErrorMessage errors={errors} name="resume" as={FormFieldErrorMessage} />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    Apply
                </button>
            </form>
        </FormContainer>
    );
}