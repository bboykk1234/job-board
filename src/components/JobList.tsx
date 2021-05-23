import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JobModel, JobsCategorizedByJobFunction } from "../../@types";
import { UserContext } from "../contexts/User";
import ContentContainer from "./ContentContainer";

export default function JobList() {
    const [jobs, setJobs] = useState<JobModel[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        loadJobs();
    }, []);

    async function loadJobs(page = 1) {
        try {
            const { data } = await axios.get<any, AxiosResponse<JobModel[]>>("/jobs?category=job_function");
            setJobs(data);
        } catch (err) {
            console.log(err);
        }
    }

    function renderJobItems(jobs: JobModel[]) {
        const innerJobs = [...jobs];
        return jobs.map(outerJob => (
            <div key={outerJob.jobFunctionId}>
                <h4>{outerJob.jobFunction?.name}</h4>
                {jobs.filter(innerJob => outerJob.jobFunctionId == innerJob.jobFunctionId)
                    .map(({ id, title, location }) => {
                        return (
                            <div className="row text-muted pt-3" key={id}>
                                <div className="col-11">
                                    <Link to={`/jobs/${id}`} className="d-flex text-decoration-none text-muted">
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
                        )
                    })}
            </div>
        ));
    }

    return (
        <ContentContainer>
            <h4 className="border-bottom pb-2 mb-0 text-center">Jobs Openings</h4>
            {jobs.length
                ? <div style={{ minHeight: "300px" }}>{renderJobItems(jobs)}</div>
                : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "250px" }}>
                        <p className="text-muted">No job openings at the moment</p>
                    </div>
                )}
        </ContentContainer>
    );
}