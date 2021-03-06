import axios, { AxiosResponse } from "axios";
import { RawDraftContentState } from "draft-js";
import { useContext, useEffect, useState } from "react";
import Link from "./Link";
import { GetJobResponseSchema, GetJobResponseState } from "../@types";
import { UserContext } from "../contexts/User";
import ContentContainer from "./ContentContainer";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const EditorNoSSR = dynamic<{ readOnly: boolean, editorClassName: string, toolbarHidden: boolean, initialContentState: RawDraftContentState }>(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor) as any,
  { ssr: false }
)

export default function JobDetail() {
  const router = useRouter();
  const { id: jobId } = router.query;

  const [job, setJob] = useState<GetJobResponseState>();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    let mounted = true
    if (!jobId) {
      return;
    }

    async function loadJob(jobId: number) {
      try {
        const { data } = await axios.get<any, AxiosResponse<GetJobResponseSchema>>(`/jobs/${jobId}`);
        if (mounted && data) {
          const descEditorContent = (data.description
            ? JSON.parse(data.description)
            : { blocks: [], entityMap: {} }) as RawDraftContentState;
          setJob({
            ...data,
            descEditorContent
          });
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }

    loadJob(parseInt(jobId as string));

    return () => { mounted = false }
  }, [jobId]);

  async function handleClose() {
    try {
      const { data } = await axios.post(`/jobs/${jobId}/close`);
      if (data.status) {
        await router.push("/jobs");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (job) {
    const {
      descEditorContent: editorContent,
      title,
      location,
      employmentType,
      level,
      jobFunction,
      createdAt,
      updatedAt,
      skills,
    } = job;

    return (
      <ContentContainer>
        <Link className="text-decoration-none d-inline-flex align-items-center" href="/jobs"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg><span className="ps-1">Job Openings</span></Link>
        <div className="row mx-0">
          <div className="col-8 ps-2 pe-4">

            <div className="py-2 border-bottom">
              <h3>{title}</h3>
              <span className="text-muted">{location}</span>
            </div>
            <EditorNoSSR
              readOnly
              editorClassName="fs-6"
              toolbarHidden
              initialContentState={editorContent}
            />
          </div>
          <div className="col-4 pe-2 ps-4">
            <Link className="btn btn-primary w-100" href={`/jobs/${jobId}/apply`}>Apply for This Job</Link>
            {
              isLoggedIn && (
                <>
                  <Link className="btn btn-primary w-100 mt-2" href={`/jobs/${jobId}/applications`}>View Applications</Link>
                  <Link className="btn btn-primary w-100 mt-2" href={`/jobs/${jobId}/edit`}>Edit</Link>
                  <button className="btn btn-danger w-100 mt-2" onClick={handleClose}>Close</button>
                </>
              )
            }
            <div className="mt-5">
              <div className="mb-3">
                <div className="text-muted fs-6">Location</div>
                <div className="fs-6">{location}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted fs-6">Job Function</div>
                <div className="fs-6">{jobFunction.name}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted fs-6">Employment Type</div>
                <div className="fs-6">{employmentType.name}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted fs-6">Seniority Level</div>
                <div className="fs-6">{level.name}</div>
              </div>
              {
                isLoggedIn && (
                  <>
                    <div className="mb-3">
                      <div className="text-muted fs-6">Created At</div>
                      <div className="fs-6">{createdAt}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-muted fs-6">Last Edited At</div>
                      <div className="fs-6">{updatedAt}</div>
                    </div>
                  </>
                )
              }
              <div className="mb-3">
                <div className="text-muted fs-6">Skill Needed</div>
                <div className="fs-6">{skills.map(skill => skill.name).join(", ")}</div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    );
  }

  if (!job && !isLoading) {
    return <ContentContainer>
      <Link className="text-decoration-none d-inline-flex align-items-center" href="/jobs"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
      </svg><span className="ps-1">Job Openings</span></Link>
      <div className="d-flex justify-content-center align-items-center" style={{ height: "250px" }}>
        <p className="text-muted">Job not found...</p>
      </div>
    </ContentContainer>;
  }

  return <ContentContainer>
    <div className="text-center my-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </ContentContainer>;
}
