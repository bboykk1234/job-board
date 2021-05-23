import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Job } from "../../@types";
import { UserContext } from "../contexts/User";
import ContentContainer from "./ContentContainer";

export default function JobList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        loadJobs();
    }, []);

    async function loadJobs(page = 1) {
        try {
            const { data } = await axios.get<any, AxiosResponse<Job[]>>("/jobs");
            setJobs(data);
        } catch (err) {
            console.log(err);
        }
    }

    function renderJobItems(jobs: Job[]) {
        return (
            jobs.map(({ title, id, location }) => (
                <div className="row text-muted pt-3" key={id}>
                    <div className="col-11">
                        <Link to={`/jobs/${id}`} className="d-flex text-decoration-none text-muted">
                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                            <h5 className="text-gray-dark mb-0">{title}</h5>
                        </Link>
                    </div>
                    <div className="col-1 text-end">
                        {location}
                        {
                            user && (
                                <Link to={`/jobs/${id}/applications`}>View Applications</Link>
                            )
                        }
                    </div>
                </div>
            ))
        );
    }

    return (
        <ContentContainer>
            <h4 className="border-bottom pb-2 mb-0 text-center">Jobs Openings</h4>
            {jobs.length
                ? <div style={{minHeight: "300px"}}>{renderJobItems(jobs)}</div>
                : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "250px" }}>
                        <p className="text-muted">No job openings at the moment</p>
                    </div>
                )}
        </ContentContainer>
    );
}