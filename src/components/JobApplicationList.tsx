import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import { JobApplication } from "../../@types";
import 'dotenv/config';
import ContentContainer from "./ContentContainer";

export default function JobApplicationList() {
    const params = useParams<{ id: string | undefined }>()
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
    const [cookies] = useCookies(["tk"]);

    useEffect(() => {
        async function loadJobApplications(params: { id: string | undefined }) {
            try {
                const { data } = await axios.get<any, AxiosResponse<JobApplication[]>>(getApiUrl(params));
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

    function renderJobApplicationItems(jobApplications: JobApplication[]) {
        return (
            jobApplications.map(({
                firstName,
                lastName,
                id,
                email,
                phoneNumber,
                address,
                city,
                province,
                postalCode,
                country
            }) => (
                <div className="row text-muted pt-3" key={id}>
                    <div className="col-11">
                        <Link to={`/jobs/${id}`} className="d-flex text-decoration-none text-muted">
                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                            <h5 className="text-gray-dark mb-0">{lastName + " " + firstName}</h5>
                            <span>{email}</span>
                            <span>{phoneNumber}</span>
                        </Link>
                    </div>
                    <div className="col-1 text-end">
                        <span>Address: </span>
                        {`${address} ${postalCode} ${city} ${province} ${country}`}
                        <button onClick={() => openDownloadTab(id)}>Download</button>
                    </div>
                </div>
            ))
        );
    }

    return (
        <ContentContainer>
            <h4 className="border-bottom border-2 pb-2 mb-0 text-center">Applications</h4>
            {jobApplications.length
                ? renderJobApplicationItems(jobApplications)
                : (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "250px" }}>
                        <p className="text-muted">No applications at the moment</p>
                    </div>
                )}
        </ContentContainer>
    );
}