import * as Knex from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    await knex("job_skill").delete();
    await knex("jobs").delete();
    await knex("skills").delete();
    await knex("levels").delete();
    await knex("job_functions").delete();
    await knex("employment_types").delete();
    await knex("users").delete();

    const userId = await knex("users").insert({
        username: 'admin',
        password: bcrypt.hashSync("admin", 10),
        created_at: new Date(),
        updated_at: new Date()
    });

    //#region employment_types
    const internshipETId = await knex("employment_types").insert({
        name: "Internship",
        created_at: new Date(),
        updated_at: new Date()
    });
    const contractETId = await knex("employment_types").insert({
        name: "Contract",
        created_at: new Date(),
        updated_at: new Date()
    });
    const parttimeETId = await knex("employment_types").insert({
        name: "Part-time",
        created_at: new Date(),
        updated_at: new Date()
    });
    const fulltimeETId = await knex("employment_types").insert({
        name: "Full-time",
        created_at: new Date(),
        updated_at: new Date()
    });
    const freelanceETId = await knex("employment_types").insert({
        name: "Freelance",
        created_at: new Date(),
        updated_at: new Date()
    });
    //#endregion employment_types

    //#region levels
    const internshipLevelId = await knex("levels").insert({
        name: "Internship",
        created_at: new Date(),
        updated_at: new Date()
    });
    const entryLevelId = await knex("levels").insert({
        name: "Entry Level",
        created_at: new Date(),
        updated_at: new Date()
    });
    const assocLevelId = await knex("levels").insert({
        name: "Associate",
        created_at: new Date(),
        updated_at: new Date()
    });
    const midSeniorLevelId = await knex("levels").insert({
        name: "Mid-Senior Level",
        created_at: new Date(),
        updated_at: new Date()
    });
    const directorLevelId = await knex("levels").insert({
        name: "Director",
        created_at: new Date(),
        updated_at: new Date()
    });
    const executiveLevelId = await knex("levels").insert({
        name: "Executive",
        created_at: new Date(),
        updated_at: new Date()
    });
    const notApplicableLevelId = await knex("levels").insert({
        name: "Not Applicable",
        created_at: new Date(),
        updated_at: new Date()
    });
    //#endregion levels

    //#region skills
    const phpSkillId = await knex("skills").insert({
        name: "PHP",
        created_at: new Date(),
        updated_at: new Date()
    });
    const jsSkillId = await knex("skills").insert({
        name: "Javascript (JS)",
        created_at: new Date(),
        updated_at: new Date()
    });
    const nodejsSkillId = await knex("skills").insert({
        name: "NodeJs",
        created_at: new Date(),
        updated_at: new Date()
    });
    const reactjsSkillId = await knex("skills").insert({
        name: "ReactJs",
        created_at: new Date(),
        updated_at: new Date()
    });
    const rubySkillId = await knex("skills").insert({
        name: "Ruby",
        created_at: new Date(),
        updated_at: new Date()
    });
    const devopsSkillId = await knex("skills").insert({
        name: "DevOps",
        created_at: new Date(),
        updated_at: new Date()
    });
    const golangSkillId = await knex("skills").insert({
        name: "Go Lang",
        created_at: new Date(),
        updated_at: new Date()
    });
    const laravelSkillId = await knex("skills").insert({
        name: "Laravel",
        created_at: new Date(),
        updated_at: new Date()
    });
    const rubyRailSkillId = await knex("skills").insert({
        name: "Ruby on Rail",
        created_at: new Date(),
        updated_at: new Date()
    });
    const wordpressSkillId = await knex("skills").insert({
        name: "Wordpress",
        created_at: new Date(),
        updated_at: new Date()
    });
    const cicdSkillId = await knex("skills").insert({
        name: "CI/CD",
        created_at: new Date(),
        updated_at: new Date()
    });
    const nextjsSkillId = await knex("skills").insert({
        name: "NextJs",
        created_at: new Date(),
        updated_at: new Date()
    });
    const scssSkillId = await knex("skills").insert({
        name: "SCSS",
        created_at: new Date(),
        updated_at: new Date()
    });
    const lessSkillId = await knex("skills").insert({
        name: "LESS",
        created_at: new Date(),
        updated_at: new Date()
    });
    const awsSkillId = await knex("skills").insert({
        name: "Amazon Web Services (AWS)",
        created_at: new Date(),
        updated_at: new Date()
    });
    const gcpSkillId = await knex("skills").insert({
        name: "Google Cloud Platform (GCP)",
        created_at: new Date(),
        updated_at: new Date()
    });
    const cplusplusSkillId = await knex("skills").insert({
        name: "C++",
        created_at: new Date(),
        updated_at: new Date()
    });
    const javaSkillId = await knex("skills").insert({
        name: "Java",
        created_at: new Date(),
        updated_at: new Date()
    });
    const pythonSkillId = await knex("skills").insert({
        name: "Python",
        created_at: new Date(),
        updated_at: new Date()
    });
    const elasticsearchSkillId = await knex("skills").insert({
        name: "Elasticsearch",
        created_at: new Date(),
        updated_at: new Date()
    });
    const dotnetSkillId = await knex("skills").insert({
        name: "Microsoft .NET",
        created_at: new Date(),
        updated_at: new Date()
    });
    const swiftSkillId = await knex("skills").insert({
        name: "Swift",
        created_at: new Date(),
        updated_at: new Date()
    });
    const htmlSkillId = await knex("skills").insert({
        name: "HTML",
        created_at: new Date(),
        updated_at: new Date()
    });
    const objCSkillId = await knex("skills").insert({
        name: "Objective-C",
        created_at: new Date(),
        updated_at: new Date()
    });
    const chineseSkillId = await knex("skills").insert({
        name: "Mandarin / Chinese",
        created_at: new Date(),
        updated_at: new Date()
    });
    const engSkillId = await knex("skills").insert({
        name: "English",
        created_at: new Date(),
        updated_at: new Date()
    });
    const communicationSkillId = await knex("skills").insert({
        name: "Communication",
        created_at: new Date(),
        updated_at: new Date()
    });
    //#endregion skills

    //#region job_functions
    const accountFnId = await knex("job_functions").insert({
        name: "Accounting",
        created_at: new Date(),
        updated_at: new Date()
    });
    const adminFnId = await knex("job_functions").insert({
        name: "Adminstrative",
        created_at: new Date(),
        updated_at: new Date()
    });
    const artFnId = await knex("job_functions").insert({
        name: "Arts and Design",
        created_at: new Date(),
        updated_at: new Date()
    });
    const businessDevFnId = await knex("job_functions").insert({
        name: "Business Development",
        created_at: new Date(),
        updated_at: new Date()
    });
    const socialFnId = await knex("job_functions").insert({
        name: "Community and Social Services",
        created_at: new Date(),
        updated_at: new Date()
    });
    const consultFnId = await knex("job_functions").insert({
        name: "Consulting",
        created_at: new Date(),
        updated_at: new Date()
    });
    const eduFnId = await knex("job_functions").insert({
        name: "Education",
        created_at: new Date(),
        updated_at: new Date()
    });
    const engineeringFnId = await knex("job_functions").insert({
        name: "Engineering",
        created_at: new Date(),
        updated_at: new Date()
    });
    const entreFnId = await knex("job_functions").insert({
        name: "Entrepreneurship",
        created_at: new Date(),
        updated_at: new Date()
    });
    const financeFnId = await knex("job_functions").insert({
        name: "Finance",
        created_at: new Date(),
        updated_at: new Date()
    });
    const healthFnId = await knex("job_functions").insert({
        name: "Healthcare Services",
        created_at: new Date(),
        updated_at: new Date()
    });
    const hrFnId = await knex("job_functions").insert({
        name: "Human Resources",
        created_at: new Date(),
        updated_at: new Date()
    });
    const itFnId = await knex("job_functions").insert({
        name: "Information Technology",
        created_at: new Date(),
        updated_at: new Date()
    });
    const legalFnId = await knex("job_functions").insert({
        name: "Legal",
        created_at: new Date(),
        updated_at: new Date()
    });
    const marketFnId = await knex("job_functions").insert({
        name: "Marketing",
        created_at: new Date(),
        updated_at: new Date()
    });
    const mediaAndComFnId = await knex("job_functions").insert({
        name: "Media and Communication",
        created_at: new Date(),
        updated_at: new Date()
    });
    const operationsFnId = await knex("job_functions").insert({
        name: "Operations",
        created_at: new Date(),
        updated_at: new Date()
    });
    const productManageId = await knex("job_functions").insert({
        name: "Product Management",
        created_at: new Date(),
        updated_at: new Date()
    });
    const projectManageFnId = await knex("job_functions").insert({
        name: "Program and Project Management",
        created_at: new Date(),
        updated_at: new Date()
    });
    const purchaseFnId = await knex("job_functions").insert({
        name: "Purchasing",
        created_at: new Date(),
        updated_at: new Date()
    });
    const qaFnId = await knex("job_functions").insert({
        name: "Quality Assurance",
        created_at: new Date(),
        updated_at: new Date()
    });
    const realEsFnId = await knex("job_functions").insert({
        name: "Real Estate",
        created_at: new Date(),
        updated_at: new Date()
    });
    const researchFnId = await knex("job_functions").insert({
        name: "Research",
        created_at: new Date(),
        updated_at: new Date()
    });
    const salesFnId = await knex("job_functions").insert({
        name: "Sales",
        created_at: new Date(),
        updated_at: new Date()
    });
    const supportFnId = await knex("job_functions").insert({
        name: "Support",
        created_at: new Date(),
        updated_at: new Date()
    });
    //#endregion skills

    //#region jobs
    const softEng1JobId = await knex("jobs").insert({
        creator_id: userId,
        title: "Software Engineer",
        location: "Redmond, WA",
        employment_type_id: fulltimeETId,
        level_id: midSeniorLevelId,
        job_function_id: itFnId,
        description: "{\"blocks\":[{\"key\":\"2ajma\",\"text\":\"The Commerce and Ecosystem division (C+E) in the Cloud & AI \\ngroup powers commerce for Microsoft’s key businesses like Azure, Office \\n365. The Commerce Partner & Seller Experience team within this group\\n is a great place to grow your career while working on initiatives that \\ndeliver compelling value to Microsoft’s developer and partner ecosystem \\nacross gaming, commercial, and productivity segments.\\n\\nIn this \\nposition, you will be part of a fun-loving, diverse team that seeks \\nchallenges, loves learning and values teamwork. You will collaborate \\nwith team members and partners to build full stack web and service \\napplications using latest web technologies in a dynamic and agile \\nenvironment, and have opportunities for mentorship, career growth, and \\nwork on high-business impact areas.\\n\\nSuccessful candidates will exhibit various attributes which will enhance their ability to succeed in this position.\\n\\nCollaboration\\n - As most development is about working with others, both within an \\nimmediate team, as well as across business units and portions of the \\ncompany, an ability to collaborate effectively is a core competency to \\nhave.\\n\\nCustomer Focus - A focus on delivering customer value, and \\nbeing able to directly tie engineering decisions and actions to that \\nvalue is a huge plus for successful engineers at any level.\\n\\nDrive\\n For Results - Being able to drive for results, not merely finding the \\nboundary of your responsibility, but following a problem through to its \\nconclusion, to solve it once and for all, is a skill and ability which a\\n successful engineer should exhibit.\\n\\nTechnical Excellence - Core \\nto being a software engineer is of course technical excellence. This is \\nnot merely knowing the latest and greatest language developments, but \\ndemonstrating a passion for technology, a curiosity to ‘go deep’, and an\\n ability to quickly learn and build upon past experiences, to be able to\\n extrapolate from those experiences, and deliver innovations. Technical \\nexcellence is rooted in having a strong demonstrable aptitude for \\nproblem solving.\\n\\nThe successful candidate will be able to demonstrate this broad set of attributes well.\\n\\nResponsibilities\\n\\nBased\\n in Redmond, the individual will contribute to the direction and the \\nevolution of Microsoft’s Commerce ecosystem. Whether you are delighting \\nand empowering our Partners by creating a fantastic and intuitive \\nexperience or building platforms and APIs which will power the Commerce \\nEngine of Microsoft, you will have a tremendous impact to the success of\\n Microsoft as a leading technology company. To accomplish this, we are \\nexpanding and looking for great software engineers. You should have a \\nsolid understanding of the software development cycle, from architecture\\n to testing. You will have a passion for quality, write secure, \\nreliable, scalable and maintainable code. You should be comfortable \\nowning a feature and making decisions independently.\\n\\nQualifications\\n\\nBasic Qualifications:\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2164,\"length\":16,\"style\":\"BOLD\"},{\"offset\":2948,\"length\":14,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"abo5n\",\"text\":\"Demonstrated competence programming in C++, Java or other computer programming languages preferred.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7c838\",\"text\":\"Ability\\n to demonstrate understanding of algorithms, data structures and other \\nsystems architecture factors that affect code quality, performance and \\ncustomer experience\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4mob4\",\"text\":\"Some experience building software outside of\\n the classroom environment like a hackathon, research project or related\\n experience preferred\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"vv33\",\"text\":\"Demonstrated skill in time management and completing software projects in a cooperative team environment .\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cunlo\",\"text\":\"Qualified\\n candidates Must Have Already Successfully Completed or Participated in \\nMicrosoft Leap Apprenticeship Program and worked in a software \\nengineering environment.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"erb2j\",\"text\":\"Current Microsoft Leap Apprenticeship Program Experience\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7pf4r\",\"text\":\"Ability\\n to meet Microsoft, customer and/or government security screening \\nrequirements for this role. These requirements include but are not \\nlimited to the following specialized security screenings: Microsoft \\nCloud Background Check: This position will be required to pass the \\nMicrosoft Cloud Background Check upon hire/transfer and every two years \\nthereafter.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aa1m6\",\"text\":\"Self-learner with passion for technologies.\\n\\nMicrosoft\\n is an equal opportunity employer. All qualified applicants will receive\\n consideration for employment without regard to age, ancestry, color, \\nfamily or medical care leave, gender identity or expression, genetic \\ninformation, marital status, medical condition, national origin, \\nphysical or mental disability, political affiliation, protected veteran \\nstatus, race, religion, sex (including pregnancy), sexual orientation, \\nor any other characteristic protected by applicable laws, regulations \\nand ordinances. We also consider qualified applicants regardless of \\ncriminal histories, consistent with legal requirements. If you need \\nassistance and/or a reasonable accommodation due to a disability during \\nthe application or the recruiting process, please send a request via the\\n Accommodation request form.\\n\\nBenefits/perks listed below may vary depending on the nature of your employment with Microsoft and the country where you work.\\n      \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        created_at: new Date(),
        updated_at: new Date()
    });
    await knex("job_skill").insert([
        { job_id: softEng1JobId, skill_id: golangSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: softEng1JobId, skill_id: cicdSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: softEng1JobId, skill_id: gcpSkillId, created_at: new Date(), updated_at: new Date() },
    ]);

    const softEng2JobId = await knex("jobs").insert({
        creator_id: userId,
        title: "Software Engineer",
        location: "San Francisco, CA",
        employment_type_id: fulltimeETId,
        level_id: assocLevelId,
        job_function_id: itFnId,
        description: "{\"blocks\":[{\"key\":\"fl0s7\",\"text\":\"About Twitch  Launched\\n in 2011, Twitch is a global community that comes together each day to \\ncreate multiplayer entertainment: unique, live, unpredictable \\nexperiences created by the interactions of millions. We bring the joy of\\n co-op to everything, from casual gaming to world-class esports to anime\\n marathons, music, and art streams. Twitch also hosts TwitchCon, where \\nwe bring everyone together to celebrate, learn, and grow their personal \\ninterests and passions. We’re always live at Twitch. Stay up to date on \\nall things Twitch on Linkedin , Twitter and on our Blog .  About the Position  \\n Twitch is building the future of interactive entertainment, and our \\nengineering teams are at the core of that vision. Ensuring smooth, \\nlow-latency video across the world requires large-scale, fault-tolerant \\nsystems that can keep up with millions of simultaneous viewers and \\nthousands of broadcasters. We are looking for engineers who are excited \\nby the thought of working across the entire CDN stack, from service \\nload-balancing, to performance optimization, to backbone traffic \\nmanagement. You will help architect, develop, test, deploy, operate, and\\n maintain our video software software. As part of our engineering teams,\\n you will work together to enable our broadcasters and viewers to create\\n and interact in new, innovative ways.  You Will\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"BOLD\"},{\"offset\":13,\"length\":567,\"style\":\"BOLD\"},{\"offset\":581,\"length\":19,\"style\":\"BOLD\"},{\"offset\":601,\"length\":746,\"style\":\"BOLD\"},{\"offset\":1348,\"length\":8,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"c3jup\",\"text\":\" Embrace and champion engineering best practices within your group and Twitch \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"7q78o\",\"text\":\" Produce clean, high quality code, tests, and well written documentation \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"16c47\",\"text\":\" Work closely with product managers, designers, and other collaborators to build great experiences \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"1b417\",\"text\":\" Partner with fellow engineering teams to deliver on complex initiatives together  You Have\\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":83,\"length\":8,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"7cv5b\",\"text\":\" 1+ years of software development experience. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"dgtop\",\"text\":\" 1+ years experience in Go or Python. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"6ll8a\",\"text\":\" 1+ years working with distributed, highly available systems.  Bonus Points\\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":63,\"length\":12,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"balam\",\"text\":\" Experience building iOS features with Objective-C \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"25fe7\",\"text\":\" Knowledge of VAST/VPAID standards \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"551pj\",\"text\":\" Bachelor's degree or above in Computer Science or relevant field \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"7709n\",\"text\":\" Experience with mobile video playback through AVPlayer \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"4veev\",\"text\":\" Familiarity with video compression and streaming technologies \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"cerpl\",\"text\":\" Familiarity or experience working with GraphQL APIs \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"8qkoc\",\"text\":\" Knowledge of C, C++ \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"17ng\",\"text\":\" Familiarity with web technologies and languages (HTTP, REST, HTML, CSS, JavaScript)  Perks\\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":86,\"length\":5,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"piij\",\"text\":\" Medical, Dental, Vision & Disability Insurance \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"2g305\",\"text\":\" 401(k) \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"1a9s1\",\"text\":\" Maternity & Parental Leave \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"reme\",\"text\":\" Flexible PTO \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"25m1q\",\"text\":\" Commuter Benefits \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"b7e7h\",\"text\":\" Amazon Employee Discount \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"2momj\",\"text\":\"\\n Monthly Contribution & Discounts for Wellness Related Activities \\n& Programs (e.g., gym memberships, off-site massages, etc.) \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"f3t1e\",\"text\":\" Breakfast, Lunch & Dinner Served Daily \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"4337i\",\"text\":\" Free Snacks & Beverages  \\n Pursuant to the San Francisco Fair Chance Ordinance, we will consider \\nfor employment qualified applicants with arrest and conviction records.  \\n We are an equal opportunity employer and value diversity at Twitch. We \\ndo not discriminate on the basis of race, religion, color, national \\norigin, gender, sexual orientation, age, marital status, veteran status,\\n or disability status. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":26,\"length\":145,\"style\":\"BOLD\"},{\"offset\":172,\"length\":238,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}}],\"entityMap\":{}}",
        created_at: new Date(),
        updated_at: new Date()
    });
    await knex("job_skill").insert([
        { job_id: softEng2JobId, skill_id: cplusplusSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: softEng2JobId, skill_id: pythonSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: softEng2JobId, skill_id: golangSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: softEng2JobId, skill_id: scssSkillId, created_at: new Date(), updated_at: new Date() },
    ]);

    const sales1JobId = await knex("jobs").insert({
        creator_id: userId,
        title: "Sales Consultant",
        location: "Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
        employment_type_id: fulltimeETId,
        level_id: assocLevelId,
        job_function_id: salesFnId,
        description: "{\"blocks\":[{\"key\":\"2c863\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2ephn\",\"text\":\"Durian Capital Berhad (www.duriancapital.com.my) is a registered Malaysian company focused on cultivation of Musang King. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"366kn\",\"text\":\"\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bkd64\",\"text\":\"Musang\\n King, undoubtedly, the most sought after variety of Malaysian durians, \\nhas established a niche market in the agro-commodity sector.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8er71\",\"text\":\"\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"62enl\",\"text\":\"Durian\\n Capital will be launching Malaysia's first regulated and licensed \\ndurian investment scheme for investors who are looking for a safe, \\nsimple and rewarding alternative investment portfolio. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f7dkg\",\"text\":\"\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dahii\",\"text\":\"With a land bank of 3,500+ acres, we aim to be Malaysia's largest durian exporter. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"d0ogn\",\"text\":\"\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2an53\",\"text\":\"To find out more about how you can be part of our growing team, feel free to reach out to me at athir@duriancapital.com.my\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dthnm\",\"text\":\"\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bm30f\",\"text\":\"Sales Consultant\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":16,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4r615\",\"text\":\"Responsibilities\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":16,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3noo4\",\"text\":\"Performing cold outreach to prospective investors & building a pipeline of leads\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fih3q\",\"text\":\"Exceed sales targets which are set by our company \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8s6mh\",\"text\":\"Successfully create business from new and existing investors\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fi9ai\",\"text\":\"Manage complex negotiations with potential investors\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"76vio\",\"text\":\"Build rapport and establish long term relationships with investors\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"35ehl\",\"text\":\"\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1pr1u\",\"text\":\"Qualifications\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3f56v\",\"text\":\"2-5 years' quota carrying sales experience\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"98qbd\",\"text\":\"Experience and working knowledge of CRM systems\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9v0nu\",\"text\":\"Demonstrable track record of over-achieving quota\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8mocl\",\"text\":\"Strong written and verbal communication skills\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1ubim\",\"text\":\"\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6ke62\",\"text\":\"What you’ll get \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":16,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3k72j\",\"text\":\"An\\n opportunity to be part of an experienced, dynamic, professional and \\ndriven team to introduce a newly licensed investment product into \\nMalaysian & International markets \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ei0od\",\"text\":\"Basic salary + Commission for the sale of every investment unit \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        created_at: new Date(),
        updated_at: new Date()
    });
    await knex("job_skill").insert([
        { job_id: sales1JobId, skill_id: chineseSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: sales1JobId, skill_id: engSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: sales1JobId, skill_id: communicationSkillId, created_at: new Date(), updated_at: new Date() },
    ]);

    const fullstack1JobId = await knex("jobs").insert({
        creator_id: userId,
        title: "Fullstack Engineer",
        location: "Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
        employment_type_id: fulltimeETId,
        level_id: assocLevelId,
        job_function_id: itFnId,
        description: "{\"blocks\":[{\"key\":\"7uh94\",\"text\":\"Beam is Asia-Pacific's largest and fastest-growing shared \\nmicromobility company led by technology and innovation. We're on a \\nmission to turn little drives into better rides and make cities flow \\nbetter for everyone. Shared micromobility is one of the fastest-growing \\nindustries globally, and we are leading the way in Asia-Pacific, with \\nfast-growing operations in Australia, New Zealand, South Korea, Taiwan \\nand Malaysia, with many new city launches underway.\\n\\n\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c2ugs\",\"text\":\"Our\\n engineering team builds cutting-edge technology and is uniquely \\nchallenged by real-time processing of large-scale, fast-paced vehicle \\ndata, integrating internet-connected vehicles in the biggest application\\n of Internet of Things to-date and supporting the technology needs of \\nmultiple stakeholders such as riders, governments and operations, which \\nruns a proprietary, complex and rapidly-evolving system for vehicle \\nmaintenance and charging at high cost-efficiency.\\n\\n\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fkkot\",\"text\":\"Beam\\n has a strong culture of engineering excellence where engineers pride \\nthemselves in collaborating + sharing knowledge, learning continuously, \\ninnovating to deliver high impact solutions, improving efficiencies and \\nwriting clean, reliable and scalable code.\\n\\n\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"m42k\",\"text\":\"As a \\nFullstack Engineer you will work on an independent product delivery team\\n alongside other engineers, designers, and product managers to deliver \\nhigh-impact solutions focused around one of Beam's core problems focuses\\n such as operational efficiency.\\n\\n\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"eaaf0\",\"text\":\"Responsibilities\\n\\n\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9kr2o\",\"text\":\"Develop complex software systems scaling to millions of users with production quality deployment, monitoring, and reliability. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"er7va\",\"text\":\"Develop across the full-stack (backend, mobile, UI/UX, operations) \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ee3l7\",\"text\":\"Work\\n closely with various business partners including product, design, \\ngovernment relations, business development, strategy and operations to \\nsolve high impact problems. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9dc0r\",\"text\":\"Writing functional and integration tests. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6ugfi\",\"text\":\"Sharp problem-solving skills and ability to resolve ambiguous requirements. \\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f1nk5\",\"text\":\"Requirements:\\n\\n \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"sok4\",\"text\":\"Bachelor's Degree in Computer Science or related STEM field is preferred. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"n4vo\",\"text\":\"2+\\n years expertise in one or more object-oriented design methodology and \\nlarge-scale application development (e.g. Kotlin, Ruby, Python, Go, \\nJava, C++). \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2tdps\",\"text\":\"Experience building user interfaces with HTML, CSS, and Javascript, Typescript \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9l3pu\",\"text\":\"Excellent understanding of computer science fundamentals, data structures, and algorithms. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dbost\",\"text\":\"Excellent communication skills with both technical and non-technical audiences. \\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4pm46\",\"text\":\"Benefits:\\n\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4jh1c\",\"text\":\"Join us to be part of the urban mobility and sustainable transportation revolution!\\n\\n\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"77lh1\",\"text\":\"We\\n are a startup in every sense of the word. Expect autonomy, visibility, \\nbreakneck pace, cutting-edge technology, barriers to overcome, problems \\nto pursue. If you are one to lead the charge, smash through barriers and\\n create positive impact, we want to talk to you!\\n\\nAt Beam, we offer: \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"euh2g\",\"text\":\"Opportunity to make an impact by being part of a movement that will revolutionise transportation in cities \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9fdqv\",\"text\":\"Be part of an organisation in hyper-growth mode with plenty of opportunity for personal development \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1092j\",\"text\":\"Flexible and inspiring workplace with a team of competent, motivated and fun co-workers \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5n6kv\",\"text\":\"Autonomy and ownership of the work you do, with flexible hours and even unlimited days off \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c1r7a\",\"text\":\"Your choice of a MacBook or Windows laptop \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"38ugi\",\"text\":\"Comprehensive remuneration package and benefits \\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"793p2\",\"text\":\"The\\n Beam Group of Companies is an equal employment opportunity employer, \\ndedicated to providing an inclusive, open and diverse work environment. \\nAll are welcome regardless of race, language, religion, gender, \\nnationality, age, disability or other divisive categorisations.\\n\\n\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6r233\",\"text\":\"By\\n submitting an application, you acknowledge that you have read the \\nPrivacy Policy and that you consent to Beam processing data in \\naccordance with the Privacy Policy. Please let us know if you change \\nyour mind at any time in relation to Beam processing your personal data.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":277,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        created_at: new Date(),
        updated_at: new Date()
    });
    await knex("job_skill").insert([
        { job_id: fullstack1JobId, skill_id: jsSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: fullstack1JobId, skill_id: htmlSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: fullstack1JobId, skill_id: rubySkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: fullstack1JobId, skill_id: golangSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: fullstack1JobId, skill_id: cplusplusSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: fullstack1JobId, skill_id: pythonSkillId, created_at: new Date(), updated_at: new Date() },
    ]);

    const hr1JobId = await knex("jobs").insert({
        creator_id: userId,
        title: "HR Generalist",
        location: "Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
        employment_type_id: fulltimeETId,
        level_id: assocLevelId,
        job_function_id: itFnId,
        description: "{\"blocks\":[{\"key\":\"11ie5\",\"text\":\"Company  :  Hach Malaysia Sdn Bhd. (Part of Danaher Corporation) \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"BOLD\"},{\"offset\":9,\"length\":1,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8io46\",\"text\":\"Location  : 1, Persiaran Industri Taman Perindustrian Sri Damansara, Bandar Sri\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":9,\"style\":\"BOLD\"},{\"offset\":10,\"length\":2,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"1p3f4\",\"text\":\"                                          Damansara, 52200 Kuala Lumpur, Malaysia\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3cs1v\",\"text\":\"Position                            : HR Generalist, WQ Platform Malaysia \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":37,\"style\":\"BOLD\"},{\"offset\":38,\"length\":13,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4fir6\",\"text\":\"Reporting to                    :  Country HR Manager, WQ Platform Malaysia\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":35,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"bnno4\",\"text\":\"Works Closely with : General\\n Manager, Business Heads in Sales/Service/Finance/SCM, Central Payroll \\nteam, HR counterparts – across Water Quality and Danaher SEA region \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":18,\"style\":\"BOLD\"},{\"offset\":19,\"length\":2,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"60m1m\",\"text\":\"Reportees : This is an individual contributor role\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":9,\"style\":\"BOLD\"},{\"offset\":10,\"length\":1,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"ckfjg\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ccv3o\",\"text\":\"DANAHER \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"6dme4\",\"text\":\"Danaher\\n Corporation is an $ 20 billion company that designs, manufactures and \\nmarkets products and services with strong brand names, proprietary \\ntechnologies and major market positions. Driven by strong core values \\nand a foundation provided by the Danaher Business System, Danaher's \\nassociates are pursuing a focused strategy aimed at creating a Premier \\nGlobal Enterprise. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1i1ij\",\"text\":\"Danaher operates globally with about 50% of \\nits revenues derived from outside the United States. The Company has \\nsignificant operating businesses headquartered in Europe and has greatly\\n expanded its operating presence in Asia over the past several years. \\nDanaher is a well-capitalized business, which has historically used \\navailable cash flow to fund acquisition activity. Our consistent success\\n is the direct result of our people and the Danaher Business System \\n(DBS). DBS has evolved from a collection of manufacturing improvement \\ntools into a philosophy, set of values and series of management \\nprocesses that collectively define who we are and how we do what we do. \\nToday, our DBS tools are designed to help us excel in areas of GROWTH, \\nLEADERSHIP and LEAN. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cuqr1\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5j4vf\",\"text\":\"Diversity & Inclusion:\\n At Danaher, we are dedicated to building and sustaining a truly diverse\\n and inclusive culture. These are not just words on a page—Diversity and\\n Inclusion is a top priority for the company, and it ties deeply to each\\n of our core values. Danaher Corporation and all Danaher Companies are \\nequal opportunity employers that evaluate applicants without regard to \\nrace, color, national origin, religion, sex, age, marital status, \\ndisability, veteran status, sexual orientation, gender identity, or \\nother characteristics protected by law. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":22,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"44lp1\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8f7e4\",\"text\":\"Water Quality Platform  : Danaher's\\n Water Quality (‘WQ”) Platform is part of the Environmental & \\nApplied Solutions reporting segment and is a global leader in water \\nquality analysis and treatment, providing instrumentation and \\ndisinfection systems to help analyze and manage the quality of \\nultra-pure water, portable water, wastewater, groundwater and ocean \\nwater in residential, commercial, industrial, and natural resource \\napplications. Our water quality business provides products under a \\nvariety of brands, including Hach, Trojan Technologies, McCrometer and \\nChemTreat. WQ Asia has sales offices in Malaysia, India, Australia, New \\nZeland , Singapore, South Korea, Thailand & Indonesia.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":26,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"31t56\",\"text\":\"\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2so2m\",\"text\":\"Position Scope:\\n  This is a new position that has come up with the growing business of \\nHach post acquisition of its distributor partner and consolidation of \\nWater Quality Centers of Excellence in Malaysia. This position is \\nresponsible for providing HR partnership to APAC business units \\nassociates whom are based in Malaysia and to provide overall HR \\nGeneralist support for Hach Malaysia entity. This person will therefore \\nwork across a variety of HR topics, ranging from recruitment to \\nprobation, performance management, to HR administration.  Some key tasks\\n are indicated below : \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fm3hs\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"blajl\",\"text\":\"Ø Talent acquisition and recruitment –\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2,\"length\":36,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"f53k0\",\"text\":\"·      Tracking of open positions and discussing the hiring requirements with the hiring mangers\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4bm90\",\"text\":\"·      Calibrating\\n with Internal Talent Acquisition team / sourcing consultants and \\nproviding timely feedback in the weekly reviews with them\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dfgma\",\"text\":\"·      Initiating and tracking the interviews of hiring managers, cross manager, HR and management \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"abhs3\",\"text\":\"·      Process\\n control improvement to measure and improve the time to fill (lead time \\nto close an open position), quality of hire and cost of hiring\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2aeqa\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"67im4\",\"text\":\"Ø Employee Lifecycle Management –\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2,\"length\":31,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"1sbas\",\"text\":\"·      Handling associate on-boarding processes and immersion programs\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1b9g\",\"text\":\"·      Tracking\\n completion of performance objectives and development plans on a \\nquarterly basis and coaching managers to adopt the right leadership \\nbehaviors \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7bvfr\",\"text\":\"·      Own and manage the monthly and yearly Payroll \\ninput and reviews, Full & Final Settlements, merit increase \\nadministration and leave management\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"191od\",\"text\":\"·      Performance Review and Compensation Management including Sales Incentive plans\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"rt00\",\"text\":\"·      Administer exit formalities, conduct Exit interviews and provide feedback to business\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fjlu6\",\"text\":\"·      Employee counselling and day to day query handling/issue resolution\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5s2qh\",\"text\":\"·      Training need analysis and training implementation\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ave2o\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5mu91\",\"text\":\"Ø Employee Engagement and Communication –\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2,\"length\":39,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"b07in\",\"text\":\"·      Driving Engagement Survey participation and associate engagement activities\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"39fa\",\"text\":\"·      Managing employee recognition programs\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"a5enf\",\"text\":\"·      Championing the monthly/quarterly all hands meeting/townhalls and internal communication\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6g7o6\",\"text\":\"·      Initiating and tracking skip level meetings\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7lqcv\",\"text\":\"·      Managing and implementing retention measures\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dm8b5\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6p14t\",\"text\":\"Ø Monthly Tracking -\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2,\"length\":18,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"8nser\",\"text\":\"·      Monthly update of Headcount and Cost projections and annual budget preparation\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3db6r\",\"text\":\"·      Maintenance and timely updating of employee changes on Workday\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7vler\",\"text\":\"·      Preparation\\n and review of monthly HR Metrics in the form of visual or daily \\nmanagement (a part of Danaher Business system)\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7todr\",\"text\":\"·      Leverage external agencies to ensure compliance across Hach offices (PF, Statutory compliances etc)\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1kpe6\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8ujbc\",\"text\":\"Ø Qualification & Experience -\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2,\"length\":28,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"e4okg\",\"text\":\"·      Experience – min 8 years in an HR Business Partnering or an HR generalist role with an MNC organization \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"rjm7\",\"text\":\"·      Education – Bachelor’s Degree in any discipline\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"49utp\",\"text\":\"·      Ability to build relationships and influence people in a matrix environment \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"31fch\",\"text\":\"·      Ability to create and enforce process discipline and a positive work culture \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"arasd\",\"text\":\"·      Proficiency in MS Office (Excel) is necessary and experience of Workday will be an added advantage\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"e8b20\",\"text\":\"·      Excellent communication and presentation skills\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6s6s0\",\"text\":\"·      Flexibility to travel to offices across Malaysia and SEA (on need basis) \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2veh6\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fq6eh\",\"text\":\" Why is this a great role?\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":26,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"bp0ac\",\"text\":\" \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6ja1n\",\"text\":\"Working\\n at Danaher, you’ll have the opportunity to raise your professional game\\n in a way no other company or environment can duplicate. We’re \\ninnovative, fast-paced, results- oriented, and most importantly, we like\\n to win. Why? Because winning is fun! We need talented people to keep \\nwinning. But, when it comes to the professional development of our \\nleaders and associates, we’re serious. Our businesses are growing, and \\ndevelopment of our associates is critical to our collective success. The\\n breadth and depth of our family of brands makes it possible for us to \\noffer a variety of dynamic and challenging career opportunities across \\nsome of the most demanding and attractive global industries, including \\nhealthcare, environmental and communications. You’ll have the unique \\nexperience to learn the Danaher Business System, our common operating \\nsystem used to shape strategy, focus execution, align our people, and \\ncreate tremendous value for customers and shareholders. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8i11v\",\"text\":\"Danaher\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        created_at: new Date(),
        updated_at: new Date()
    });
    await knex("job_skill").insert([
        { job_id: hr1JobId, skill_id: chineseSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: hr1JobId, skill_id: engSkillId, created_at: new Date(), updated_at: new Date() },
        { job_id: hr1JobId, skill_id: communicationSkillId, created_at: new Date(), updated_at: new Date() },
    ]);
    //#endregion jobs
};
