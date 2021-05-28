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

    const job = await Job.query()
        .findById(jobApplication.jobId)
        .withGraphFetched({
            employmentType: true,
            level: true,
            jobFunction: true,
            skills: true,
        });

    if (!job) {
        throw new Error("Missing job for application");
    }

    const employmentType = job.employmentType;
    const level = job.level;
    const jobFunction = job.jobFunction;
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

    const skillNames = job.skills?.map(skill => skill.name.trim().toLowerCase())
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