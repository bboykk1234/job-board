import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Job } from "../../@types";

export default function JobList() {
    const [jobs, setJobs] = useState<Job[]>([]);

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

    return (
        <ul>
            {jobs.map(({ title, id }) => (
                <>
                    <li key={id}>{title} <Link to={`jobs/${id}/apply`}>Apply Here</Link></li>
                </>
            ))}
        </ul>
    );
}