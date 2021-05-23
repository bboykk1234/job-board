import axios, { AxiosResponse } from "axios";
import { RawDraftContentState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Link, useParams } from "react-router-dom";
import { Job } from "../../@types";

export default function JobDetail() {
    const { id: jobId } = useParams<{ id: string }>();
    const [job, setJob] = useState<Job>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadJob(jobId: number) {
            try {
                let { data } = await axios.get<any, AxiosResponse<Job>>(`/jobs/${jobId}`);
                data.descEditorContent = JSON.parse(data.description) as RawDraftContentState;
                setJob(data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        loadJob(parseInt(jobId));
    }, [jobId]);

    if (job) {
        const { descEditorContent: editorContent } = job;

        return (
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <Link to={`/jobs/${jobId}/apply`}>Apply</Link>
                <Editor
                    readOnly
                    toolbarHidden
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    initialContentState={editorContent}
                />
            </div>
        );
    }

    if (!job && !isLoading) {
        return <div>Job not found</div>;
    }

    return <div>Loading...</div>;
}