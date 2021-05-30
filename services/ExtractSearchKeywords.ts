import keywordExtractor from "keyword-extractor";
import { uniq } from "lodash";
import Country from "../models/Country";
import EmploymentType from "../models/EmploymentType";
import Job from "../models/Job";
import JobApplication from "../models/JobApplication";
import JobFunction from "../models/JobFunction";
import Level from "../models/Level";
import Skill from "../models/Skill";

export const extractForJobApplication = async (jobApplication: JobApplication) => {
  const name = jobApplication.name.trim().toLowerCase();
  const address = jobApplication.address.trim().toLowerCase();
  const province = jobApplication.province.trim().toLowerCase();
  const city = jobApplication.city.trim().toLowerCase();
  const email = jobApplication.email.trim().toLowerCase();
  const phoneNumber = jobApplication.phoneNumber.trim().toLowerCase();

  // console.log(jobApplication.job);

  if (!jobApplication.job) {
    const job = await Job.query()
      .findById(jobApplication.jobId)
      .withGraphFetched({
        employmentType: true,
        level: true,
        jobFunction: true,
        skills: true,
      });
    jobApplication.job = job
  }


  const job = jobApplication.job;
  const country = jobApplication.country;
  const employmentType = job.employmentType;
  const level = job.level;
  const jobFunction = job.jobFunction;
  const skills = job.skills || [];
  const jobDescPlaintext = Job.getDescriptionPlainText(job);

  if (!employmentType) {
    throw new Error("Missing employee type for job");
  }
  if (!level) {
    throw new Error("Missing level for job");
  }

  if (!jobFunction) {
    throw new Error("Missing job function for job");
  }

  if (!skills) {
    throw new Error("Missing job function for job");
  }

  if (!country) {
    throw new Error("Missing country for job application");
  }

  const skillNames = skills.map(skill => skill.name.trim().toLowerCase())
    .join(" ") || "";

  const typeName = employmentType.name.trim().toLowerCase();
  const levelName = level.name.trim().toLowerCase();
  const jobFunctionName = jobFunction.name.trim().toLowerCase();
  const countryName = country.name.trim().toLowerCase();

  const keywords = [
    name,
    address,
    countryName,
    province,
    city,
    email,
    phoneNumber,
    typeName,
    levelName,
    jobFunctionName,
    skillNames,
  ];

  const searchKeywords = [
    ...keywords,
    ...keywordExtractor.extract(jobDescPlaintext, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
    })
  ];

  return uniq(searchKeywords).join(" ") || ""
}

export const extractForJob = async (job: Job) => {
  const title = job.title.trim().toLowerCase();
  const location = job.location.trim().toLowerCase();
  const jobDescPlaintext = Job.getDescriptionPlainText(job);

  if (!job.employmentType) {
    const employmentType = await job.$relatedQuery("employmentType").first()
    job.employmentType = employmentType
  }

  if (!job.level) {
    const level = await job.$relatedQuery("level").first()
    job.level = level
  }

  if (!job.jobFunction) {
    const jobFunction = await job.$relatedQuery("jobFunction").first()
    job.jobFunction = jobFunction
  }

  if (!job.skills) {
    const skills = await job.$relatedQuery("skills")
    job.skills = skills
  }

  const employmentType = job.employmentType;
  const level = job.level;
  const jobFunction = job.jobFunction;
  const skillNames = job.skills.map(skill => skill.name.trim().toLowerCase())
    .join(" ") || "";
  const typeName = employmentType.name.trim().toLowerCase();
  const levelName = level.name.trim().toLowerCase();
  const jobFunctionName = jobFunction.name.trim().toLowerCase();

  const keywords = [
    title,
    location,
    jobDescPlaintext,
    typeName,
    levelName,
    jobFunctionName,
    skillNames,
  ];

  const searchKeywords = [
    ...keywords,
    ...keywordExtractor.extract(jobDescPlaintext, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
    })
  ];

  return uniq(searchKeywords).join(" ") || "";
}
