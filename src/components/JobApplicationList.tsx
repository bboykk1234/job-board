import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import { JobApplicationModelWithSkills } from "../../@types";
import 'dotenv/config';
import ContentContainer from "./ContentContainer";

export default function JobApplicationList() {
    const params = useParams<{ id: string | undefined }>()
    const [jobApplications, setJobApplications] = useState<JobApplicationModelWithSkills[]>([]);
    const [cookies] = useCookies(["tk"]);

    useEffect(() => {
        async function loadJobApplications(params: { id: string | undefined }) {
            try {
                const { data } = await axios.get<any, AxiosResponse<JobApplicationModelWithSkills[]>>(getApiUrl(params));
                setJobApplications(data);
            } catch (err) {
                console.log(err);
            }
        }

        loadJobApplications(params);
    }, [params]);

    function getApiUrl(params: { id: string | undefined }) {
        const { id } = params;
        return id ? `/jobs/${id}/applications` : `/job_applications`;
    }

    function openDownloadTab(id: number) {
        window.open(`${process.env.REACT_APP_API_URL}/api/job_applications/${id}/download?token=${cookies.tk}`, "_blank");
    }

    function renderJobApplicationItems(jobApplications: JobApplicationModelWithSkills[]) {
        return jobApplications.map(({
            firstName,
            lastName,
            id,
            email,
            phoneNumber,
            address,
            city,
            province,
            postalCode,
            country,
            job: { title, jobSkillPivot }
        }) => (
            <div className="accordion-item" key={id}>
                <h5 className="accordion-header" id="jobApplicantName">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#jobApplicantDetail-${id}`} aria-expanded="false" aria-controls={`jobApplicantDetail-${id}`}>
                        {lastName + " " + firstName}
                    </button>
                </h5>
                <div id={`jobApplicantDetail-${id}`} className="accordion-collapse collapse" aria-labelledby="jobApplicantName">
                    <div className="accordion-body">
                        <div className="row">
                            <div className="col-6 border-end">
                                <h6>Applicant Detail</h6>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <div className="text-muted fs-6">Name</div>
                                        <div className="fs-6 text-break">{lastName + " " + firstName}</div>
                                    </div>

                                    <div className="col-6">
                                        <div className="text-muted fs-6">Email</div>
                                        <div className="fs-6 text-break">{email}</div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <div className="text-muted fs-6">Phone Number</div>
                                        <div className="fs-6 text-break">{phoneNumber}</div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-muted fs-6">Address</div>
                                        <div className="fs-6 text-break">{address}</div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <div className="text-muted fs-6">Postal Code</div>
                                        <div className="fs-6 text-break">{postalCode}</div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-muted fs-6">City</div>
                                        <div className="fs-6 text-break">{city}</div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <div className="text-muted fs-6">Province</div>
                                        <div className="fs-6 text-break">{province}</div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-muted fs-6">Country</div>
                                        <div className="fs-6 text-break">{country}</div>
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={() => openDownloadTab(id)}>Download Resume</button>
                            </div>
                            <div className="col-6">
                                <h6>Applied For</h6>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="text-muted fs-6">Job Title</div>
                                        <div className="fs-6 text-break">{province}</div>
                                    </div>
                                    <div className="col-12">
                                        <div className="text-muted fs-6">Skills Needed</div>
                                        <div className="fs-6 text-break">{jobSkillPivot.map(jobSkill => jobSkill.skill.name).join(", ")}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <ContentContainer>
            <h4 className="border-bottom border-2 pb-2 mb-0 text-center">Applicants</h4>
            {jobApplications.length
                ? (
                    <div className="accordion accordion-flush" id="jobApplicationList">
                        {renderJobApplicationItems(jobApplications)}
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "250px" }}>
                        <p className="text-muted">No applications at the moment</p>
                    </div>
                )}
        </ContentContainer>
    );
}