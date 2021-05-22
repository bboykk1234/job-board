import { JobApplicationFormFieldValues } from "../../@types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory, useParams } from "react-router";

export default function JobApplicationForm() {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm<JobApplicationFormFieldValues>();
    const { id: jobId } = useParams<{ id: string }>();

    async function onSubmit(values: JobApplicationFormFieldValues) {
        try {
            let formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                if (key != "resume") {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" {...register("lastName", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" {...register("firstName", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" {...register("email", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                <input type="text" className="form-control" id="phoneNumber" {...register("phoneNumber", { required: true, maxLength: 20 })} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" {...register("address", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" {...register("city", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="province">Province</label>
                <input type="text" className="form-control" id="province" {...register("province", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="postalCode">Postal Code</label>
                <input type="text" className="form-control" id="postalCode" {...register("postalCode", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="country">Country</label>
                <input type="text" className="form-control" id="country" {...register("country", { required: true, maxLength: 255 })} />
            </div>
            <div className="mb-3">
                <label htmlFor="resume" className="form-label">Resume (Max 10MB)</label>
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
            <button type="submit" className="btn btn-primary">Apply</button>
        </form>
    );
}