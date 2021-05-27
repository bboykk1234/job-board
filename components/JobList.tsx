import axios, { AxiosResponse } from "axios";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import Link from "./Link";
import { ListJobsResponseSchema, ListJobsCategorizedByJobFunctionResponseSchema } from "../@types";
import ContentContainer from "./ContentContainer";

export default function JobList() {
    const [jobs, setJobs] = useState<ListJobsCategorizedByJobFunctionResponseSchema>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    async function loadJobs(page = 1) {
        setIsLoading(true);
        try {
            const { data } = await axios.get<any, AxiosResponse<ListJobsResponseSchema>>("/jobs");

            let categorizedData: ListJobsCategorizedByJobFunctionResponseSchema = {};

            data.results.forEach(job => {
                if (!job.jobFunction) {
                    return;
                }

                const { name } = job.jobFunction;
                if (name in categorizedData) {
                    categorizedData[name].push(job);
                    return;
                }

                categorizedData[name] = [job];
            });

            setJobs(categorizedData);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    function renderJobItems(jobs: ListJobsCategorizedByJobFunctionResponseSchema) {
        let elements = [];
        for (const [key, value] of Object.entries(jobs)) {
            const element = (
                <li key={key} className="list-group-item py-3 px-0">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{key}</div>
                        {
                            value.map(({ id, title, location }) => {
                                return (
                                    <div className="row text-muted fs-6 pt-3 mr-0" key={id}>
                                        <div className="col-6 ps-4">
                                            <Link href={`/jobs/${id}`} className="text-decoration-none">
                                                <span>{title}</span>
                                            </Link>
                                        </div>
                                        <div className="col-6 text-end pe-4">
                                            {location}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </li>
            );

            elements.push(element);
        }

        return elements;
    }

    return (
        <ContentContainer>
            <h4 className="border-bottom border-2 pb-2 mb-0 text-center">Jobs Openings</h4>
            {isLoading
                ? (
                    <div className="text-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : !isEmpty(jobs) ? (
                    <div>
                        <ul className="list-group list-group-flush">
                            {renderJobItems(jobs)}
                        </ul>
                    </div>

                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "250px" }}>
                        <p className="text-muted">No job openings at the moment</p>
                    </div>
                )
            }
        </ContentContainer >
    );
}