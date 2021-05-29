import { NextPageContext } from "next";
import React from "react";
import JobApplicationList from "../../components/JobApplicationList";

const List: React.FC<{ query: { id?: string, search?: string } }> = ({ query }) => {
    return (
        <JobApplicationList query={query} />
    )
};

export async function getServerSideProps(ctx: NextPageContext) {
    return {
        props: {
            query: ctx.query
        },
    }
}

export default List;