import keywordExtractor from "keyword-extractor";
import { uniq } from "lodash";
import Job from "../models/Job";
import JobApplication from "../models/JobApplication";

export const extractForJobApplication = async (jobApplication: JobApplication) => {
    const name = jobApplication.name.trim().toLowerCase();
    const address = jobApplication.address.trim().toLowerCase();
    const country = jobApplication.country.trim().toLowerCase();
    const province = jobApplication.province.trim().toLowerCase();
    const city = jobApplication.city.trim().toLowerCase();
    const email = jobApplication.email.trim().toLowerCase();
    const phoneNumber = jobApplication.phoneNumber.trim().toLowerCase();

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
    const employmentType = job.employmentType;
    const level = job.level;
    const jobFunction = job.jobFunction;
    const skills = job.skills;
    const jobDescPlaintext = job.getDescriptionPlainText();

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

    const skillNames = skills.map(skill => skill.name.trim().toLowerCase())
        .join(" ") || "";

    const typeName = employmentType.name.trim().toLowerCase();
    const levelName = level.name.trim().toLowerCase();
    const jobFunctionName = jobFunction.name.trim().toLowerCase();

    const keywords = [
        name,
        address,
        country,
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

    return uniq(searchKeywords).join(" ") || "";
}

export const extractForJob = async (job: Job) => {
    const title = job.title.trim().toLowerCase();
    const location = job.location.trim().toLowerCase();
    const jobDescPlaintext = job.getDescriptionPlainText();

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