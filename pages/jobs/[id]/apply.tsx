import { NextPageContext } from "next";
import React from "react";
import JobApplicationForm from "../../../components/JobApplicationForm";

const EditJob: React.FC<{ query: { id?: string, search?: string } }> = ({query}) => (
    <JobApplicationForm query={query} />
);

export async function getServerSideProps(ctx: NextPageContext) {
    return {
        props: {
            query: ctx.query
        },
    }
}

export default EditJob;