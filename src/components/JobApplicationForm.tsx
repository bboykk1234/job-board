import { JobApplicationFormFieldValues } from "../../@types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import FormContainer from "./FormContainer";
import { Link } from "react-router-dom";

export default function JobApplicationForm() {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm<JobApplicationFormFieldValues>();
    const { id: jobId } = useParams<{ id: string }>();

    async function onSubmit(values: JobApplicationFormFieldValues) {
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
    }

    return (
        <FormContainer>
            <Link className="text-decoration-none d-inline-flex align-items-center" to={`/jobs/${jobId}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg><span className="ps-1">Back</span></Link>
            <h4 className="mb-3 text-center">Job Application</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                    <div className="col-6">
                        <label htmlFor="lastName" className="form-label">Last Name<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="lastName" {...register("lastName", { required: true, maxLength: 255 })} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="firstName" className="form-label">First Name<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="firstName" {...register("firstName", { required: true, maxLength: 255 })} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email<span className="text-danger">*</span></label>
                    <input type="email" className="form-control" id="email" {...register("email", { required: true, maxLength: 255 })} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="phoneNumber">Phone Number<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="phoneNumber" {...register("phoneNumber", { required: true, maxLength: 20 })} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="address">Address<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="address" {...register("address", { required: true, maxLength: 255 })} />
                </div>
                <div className=" row mb-3">
                    <div className="col-6">
                        <label className="form-label" htmlFor="city">City<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="city" {...register("city", { required: true, maxLength: 255 })} />
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="province">Province<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="province" {...register("province", { required: true, maxLength: 255 })} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <label className="form-label" htmlFor="postalCode">Postal Code<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="postalCode" {...register("postalCode", { required: true, maxLength: 255 })} />
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="country">Country<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="country" {...register("country", { required: true, maxLength: 255 })} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume (Max 10MB, pdf only)<span className="text-danger">*</span></label>
                    <input className="form-control" type="file" id="resume" accept="application/pdf" {...register("resume", {
                        required: {
                            value: true,
                            message: "Please upload your resume",
                        },
                        validate: {
                            minFileSize: value => (value.item(0)?.size as number) < 10485760 || "File more than 10MB"
                        }
                    })} />
                    {errors.resume?.message}
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Apply</button>
            </form>
        </FormContainer>
    );
}