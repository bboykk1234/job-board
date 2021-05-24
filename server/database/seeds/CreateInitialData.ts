import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../models/User'
import bcrypt from "bcrypt";
import { EmploymentType } from '../models/EmploymentType';
import { Level } from '../models/Level';
import { Skill } from '../models/Skill';
import { JobFunction } from '../models/JobFunction';
import { Job } from '../models/Job';
import { JobSkill } from '../models/JobSkill';

export default class CreateInitialData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                { username: 'test', password: bcrypt.hashSync("123", 10), createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(EmploymentType)
            .values([
                { name: "Internship", createdAt: new Date(), updatedAt: new Date() },
                { name: "Contract", createdAt: new Date(), updatedAt: new Date() },
                { name: "Part-time", createdAt: new Date(), updatedAt: new Date() },
                { name: "Full-time", createdAt: new Date(), updatedAt: new Date() },
                { name: "Freelance", createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(Level)
            .values([
                { name: "Internship", createdAt: new Date(), updatedAt: new Date() },
                { name: "Entry Level", createdAt: new Date(), updatedAt: new Date() },
                { name: "Associate", createdAt: new Date(), updatedAt: new Date() },
                { name: "Mid-Senior Level", createdAt: new Date(), updatedAt: new Date() },
                { name: "Director", createdAt: new Date(), updatedAt: new Date() },
                { name: "Executive", createdAt: new Date(), updatedAt: new Date() },
                { name: "Not Applicable", createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(Skill)
            .values([
                { name: "PHP", createdAt: new Date(), updatedAt: new Date() },
                { name: "Javascript", createdAt: new Date(), updatedAt: new Date() },
                { name: "NodeJs", createdAt: new Date(), updatedAt: new Date() },
                { name: "ReactJs", createdAt: new Date(), updatedAt: new Date() },
                { name: "Ruby", createdAt: new Date(), updatedAt: new Date() },
                { name: "DevOps", createdAt: new Date(), updatedAt: new Date() },
                { name: "Go Lang", createdAt: new Date(), updatedAt: new Date() },
                { name: "Laravel", createdAt: new Date(), updatedAt: new Date() },
                { name: "Ruby on Rail", createdAt: new Date(), updatedAt: new Date() },
                { name: "Wordpress", createdAt: new Date(), updatedAt: new Date() },
                { name: "CI/CD", createdAt: new Date(), updatedAt: new Date() },
                { name: "NextJs", createdAt: new Date(), updatedAt: new Date() },
                { name: "SCSS", createdAt: new Date(), updatedAt: new Date() },
                { name: "LESS", createdAt: new Date(), updatedAt: new Date() },
                { name: "Amazon Web Services (AWS)", createdAt: new Date(), updatedAt: new Date() },
                { name: "Google Cloud Platforms (GCP)", createdAt: new Date(), updatedAt: new Date() },
                { name: "C++", createdAt: new Date(), updatedAt: new Date() },
                { name: "Java", createdAt: new Date(), updatedAt: new Date() },
                { name: "Python", createdAt: new Date(), updatedAt: new Date() },
                { name: "Elasticsearch", createdAt: new Date(), updatedAt: new Date() },
                { name: "Microsoft .NET", createdAt: new Date(), updatedAt: new Date() },
                { name: "Swift", createdAt: new Date(), updatedAt: new Date() },
                { name: "HTML", createdAt: new Date(), updatedAt: new Date() },
                { name: "Objective-C", createdAt: new Date(), updatedAt: new Date() },
                { name: "REST", createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(JobFunction)
            .values([
                { name: "Accounting", createdAt: new Date(), updatedAt: new Date() },
                { name: "Adminstrative", createdAt: new Date(), updatedAt: new Date() },
                { name: "Arts and Design", createdAt: new Date(), updatedAt: new Date() },
                { name: "Business Development", createdAt: new Date(), updatedAt: new Date() },
                { name: "Community and Social Services", createdAt: new Date(), updatedAt: new Date() },
                { name: "Consulting", createdAt: new Date(), updatedAt: new Date() },
                { name: "Education", createdAt: new Date(), updatedAt: new Date() },
                { name: "Engineering", createdAt: new Date(), updatedAt: new Date() },
                { name: "Entrepreneurship", createdAt: new Date(), updatedAt: new Date() },
                { name: "Finance", createdAt: new Date(), updatedAt: new Date() },
                { name: "Healthcare Services", createdAt: new Date(), updatedAt: new Date() },
                { name: "Human Resources", createdAt: new Date(), updatedAt: new Date() },
                { name: "Information Technology", createdAt: new Date(), updatedAt: new Date() },
                { name: "Legal", createdAt: new Date(), updatedAt: new Date() },
                { name: "Marketing", createdAt: new Date(), updatedAt: new Date() },
                { name: "Media and Communication", createdAt: new Date(), updatedAt: new Date() },
                { name: "Operations", createdAt: new Date(), updatedAt: new Date() },
                { name: "Product Management", createdAt: new Date(), updatedAt: new Date() },
                { name: "Program and Project Management", createdAt: new Date(), updatedAt: new Date() },
                { name: "Purchasing", createdAt: new Date(), updatedAt: new Date() },
                { name: "Quality Assurance", createdAt: new Date(), updatedAt: new Date() },
                { name: "Real Estate", createdAt: new Date(), updatedAt: new Date() },
                { name: "Research", createdAt: new Date(), updatedAt: new Date() },
                { name: "Sales", createdAt: new Date(), updatedAt: new Date() },
                { name: "Support", createdAt: new Date(), updatedAt: new Date() },
            ])
            .execute();

        let job = new Job();
        job.creatorId = 1;
        job.title = "Software Engineer";
        job.location = "Redmond, WA";
        job.employmentType = await EmploymentType.findOne({where: {name: "Full-time"}});
        job.level = await Level.findOne({where: {name: "Mid-Senior Level"}});
        job.jobFunction = await JobFunction.findOne({where: {name: "Information Technology"}});
        job.description = "{\"blocks\":[{\"key\":\"2ajma\",\"text\":\"The Commerce and Ecosystem division (C+E) in the Cloud & AI \\ngroup powers commerce for Microsoft’s key businesses like Azure, Office \\n365. The Commerce Partner & Seller Experience team within this group\\n is a great place to grow your career while working on initiatives that \\ndeliver compelling value to Microsoft’s developer and partner ecosystem \\nacross gaming, commercial, and productivity segments.\\n\\nIn this \\nposition, you will be part of a fun-loving, diverse team that seeks \\nchallenges, loves learning and values teamwork. You will collaborate \\nwith team members and partners to build full stack web and service \\napplications using latest web technologies in a dynamic and agile \\nenvironment, and have opportunities for mentorship, career growth, and \\nwork on high-business impact areas.\\n\\nSuccessful candidates will exhibit various attributes which will enhance their ability to succeed in this position.\\n\\nCollaboration\\n - As most development is about working with others, both within an \\nimmediate team, as well as across business units and portions of the \\ncompany, an ability to collaborate effectively is a core competency to \\nhave.\\n\\nCustomer Focus - A focus on delivering customer value, and \\nbeing able to directly tie engineering decisions and actions to that \\nvalue is a huge plus for successful engineers at any level.\\n\\nDrive\\n For Results - Being able to drive for results, not merely finding the \\nboundary of your responsibility, but following a problem through to its \\nconclusion, to solve it once and for all, is a skill and ability which a\\n successful engineer should exhibit.\\n\\nTechnical Excellence - Core \\nto being a software engineer is of course technical excellence. This is \\nnot merely knowing the latest and greatest language developments, but \\ndemonstrating a passion for technology, a curiosity to ‘go deep’, and an\\n ability to quickly learn and build upon past experiences, to be able to\\n extrapolate from those experiences, and deliver innovations. Technical \\nexcellence is rooted in having a strong demonstrable aptitude for \\nproblem solving.\\n\\nThe successful candidate will be able to demonstrate this broad set of attributes well.\\n\\nResponsibilities\\n\\nBased\\n in Redmond, the individual will contribute to the direction and the \\nevolution of Microsoft’s Commerce ecosystem. Whether you are delighting \\nand empowering our Partners by creating a fantastic and intuitive \\nexperience or building platforms and APIs which will power the Commerce \\nEngine of Microsoft, you will have a tremendous impact to the success of\\n Microsoft as a leading technology company. To accomplish this, we are \\nexpanding and looking for great software engineers. You should have a \\nsolid understanding of the software development cycle, from architecture\\n to testing. You will have a passion for quality, write secure, \\nreliable, scalable and maintainable code. You should be comfortable \\nowning a feature and making decisions independently.\\n\\nQualifications\\n\\nBasic Qualifications:\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":2164,\"length\":16,\"style\":\"BOLD\"},{\"offset\":2948,\"length\":14,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"abo5n\",\"text\":\"Demonstrated competence programming in C++, Java or other computer programming languages preferred.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7c838\",\"text\":\"Ability\\n to demonstrate understanding of algorithms, data structures and other \\nsystems architecture factors that affect code quality, performance and \\ncustomer experience\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4mob4\",\"text\":\"Some experience building software outside of\\n the classroom environment like a hackathon, research project or related\\n experience preferred\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"vv33\",\"text\":\"Demonstrated skill in time management and completing software projects in a cooperative team environment .\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cunlo\",\"text\":\"Qualified\\n candidates Must Have Already Successfully Completed or Participated in \\nMicrosoft Leap Apprenticeship Program and worked in a software \\nengineering environment.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"erb2j\",\"text\":\"Current Microsoft Leap Apprenticeship Program Experience\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7pf4r\",\"text\":\"Ability\\n to meet Microsoft, customer and/or government security screening \\nrequirements for this role. These requirements include but are not \\nlimited to the following specialized security screenings: Microsoft \\nCloud Background Check: This position will be required to pass the \\nMicrosoft Cloud Background Check upon hire/transfer and every two years \\nthereafter.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aa1m6\",\"text\":\"Self-learner with passion for technologies.\\n\\nMicrosoft\\n is an equal opportunity employer. All qualified applicants will receive\\n consideration for employment without regard to age, ancestry, color, \\nfamily or medical care leave, gender identity or expression, genetic \\ninformation, marital status, medical condition, national origin, \\nphysical or mental disability, political affiliation, protected veteran \\nstatus, race, religion, sex (including pregnancy), sexual orientation, \\nor any other characteristic protected by applicable laws, regulations \\nand ordinances. We also consider qualified applicants regardless of \\ncriminal histories, consistent with legal requirements. If you need \\nassistance and/or a reasonable accommodation due to a disability during \\nthe application or the recruiting process, please send a request via the\\n Accommodation request form.\\n\\nBenefits/perks listed below may vary depending on the nature of your employment with Microsoft and the country where you work.\\n      \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}";
        await job.save();

        let jobSkill = new JobSkill();
        jobSkill.jobId = job.id;
        let skill = await Skill.findOne({where: {name: "Go Lang"}}) as Skill;
        jobSkill.skillId = skill.id;
        jobSkill.save();

        jobSkill = new JobSkill();
        jobSkill.jobId = job.id;
        skill = await Skill.findOne({where: {name: "CI/CD"}}) as Skill;
        jobSkill.skillId = skill.id;
        jobSkill.save();

        jobSkill = new JobSkill();
        jobSkill.jobId = job.id;
        skill = await Skill.findOne({where: {name: "Google Cloud Platforms (GCP)"}}) as Skill;
        jobSkill.skillId = skill.id;
        jobSkill.save();

        job = new Job();
        job.creatorId = 1;
        job.title = "Software Engineer";
        job.location = "San Francisco, CA";
        job.employmentType = await EmploymentType.findOne({where: {name: "Full-time"}});
        job.level = await Level.findOne({where: {name: "Associate"}});
        job.jobFunction = await JobFunction.findOne({where: {name: "Information Technology"}});
        job.description = "{\"blocks\":[{\"key\":\"fl0s7\",\"text\":\"About Twitch  Launched\\n in 2011, Twitch is a global community that comes together each day to \\ncreate multiplayer entertainment: unique, live, unpredictable \\nexperiences created by the interactions of millions. We bring the joy of\\n co-op to everything, from casual gaming to world-class esports to anime\\n marathons, music, and art streams. Twitch also hosts TwitchCon, where \\nwe bring everyone together to celebrate, learn, and grow their personal \\ninterests and passions. We’re always live at Twitch. Stay up to date on \\nall things Twitch on Linkedin , Twitter and on our Blog .  About the Position  \\n Twitch is building the future of interactive entertainment, and our \\nengineering teams are at the core of that vision. Ensuring smooth, \\nlow-latency video across the world requires large-scale, fault-tolerant \\nsystems that can keep up with millions of simultaneous viewers and \\nthousands of broadcasters. We are looking for engineers who are excited \\nby the thought of working across the entire CDN stack, from service \\nload-balancing, to performance optimization, to backbone traffic \\nmanagement. You will help architect, develop, test, deploy, operate, and\\n maintain our video software software. As part of our engineering teams,\\n you will work together to enable our broadcasters and viewers to create\\n and interact in new, innovative ways.  You Will\\n\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"BOLD\"},{\"offset\":13,\"length\":567,\"style\":\"BOLD\"},{\"offset\":581,\"length\":19,\"style\":\"BOLD\"},{\"offset\":601,\"length\":746,\"style\":\"BOLD\"},{\"offset\":1348,\"length\":8,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"c3jup\",\"text\":\" Embrace and champion engineering best practices within your group and Twitch \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"7q78o\",\"text\":\" Produce clean, high quality code, tests, and well written documentation \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"16c47\",\"text\":\" Work closely with product managers, designers, and other collaborators to build great experiences \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"1b417\",\"text\":\" Partner with fellow engineering teams to deliver on complex initiatives together  You Have\\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":83,\"length\":8,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"7cv5b\",\"text\":\" 1+ years of software development experience. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"dgtop\",\"text\":\" 1+ years experience in Go or Python. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"6ll8a\",\"text\":\" 1+ years working with distributed, highly available systems.  Bonus Points\\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":63,\"length\":12,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"balam\",\"text\":\" Experience building iOS features with Objective-C \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"25fe7\",\"text\":\" Knowledge of VAST/VPAID standards \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"551pj\",\"text\":\" Bachelor's degree or above in Computer Science or relevant field \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"7709n\",\"text\":\" Experience with mobile video playback through AVPlayer \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"4veev\",\"text\":\" Familiarity with video compression and streaming technologies \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"cerpl\",\"text\":\" Familiarity or experience working with GraphQL APIs \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"8qkoc\",\"text\":\" Knowledge of C, C++ \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"17ng\",\"text\":\" Familiarity with web technologies and languages (HTTP, REST, HTML, CSS, JavaScript)  Perks\\n\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":86,\"length\":5,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"piij\",\"text\":\" Medical, Dental, Vision & Disability Insurance \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"2g305\",\"text\":\" 401(k) \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"1a9s1\",\"text\":\" Maternity & Parental Leave \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"reme\",\"text\":\" Flexible PTO \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"25m1q\",\"text\":\" Commuter Benefits \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"b7e7h\",\"text\":\" Amazon Employee Discount \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"2momj\",\"text\":\"\\n Monthly Contribution & Discounts for Wellness Related Activities \\n& Programs (e.g., gym memberships, off-site massages, etc.) \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"f3t1e\",\"text\":\" Breakfast, Lunch & Dinner Served Daily \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}},{\"key\":\"4337i\",\"text\":\" Free Snacks & Beverages  \\n Pursuant to the San Francisco Fair Chance Ordinance, we will consider \\nfor employment qualified applicants with arrest and conviction records.  \\n We are an equal opportunity employer and value diversity at Twitch. We \\ndo not discriminate on the basis of race, religion, color, national \\norigin, gender, sexual orientation, age, marital status, veteran status,\\n or disability status. \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":26,\"length\":145,\"style\":\"BOLD\"},{\"offset\":172,\"length\":238,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"text-align\":\"justify\"}}],\"entityMap\":{}}";
        await job.save();

        jobSkill = new JobSkill();
        jobSkill.jobId = job.id;
        skill = await Skill.findOne({where: {name: "C++"}}) as Skill;
        jobSkill.skillId = skill.id;
        jobSkill.save();

        jobSkill = new JobSkill();
        jobSkill.jobId = job.id;
        skill = await Skill.findOne({where: {name: "Python"}}) as Skill;
        jobSkill.skillId = skill.id;
        jobSkill.save();

        jobSkill = new JobSkill();
        jobSkill.jobId = job.id;
        skill = await Skill.findOne({where: {name: "Go Lang"}}) as Skill;
        jobSkill.skillId = skill.id;
        jobSkill.save();

        jobSkill = new JobSkill();
        jobSkill.jobId = job.id;
        skill = await Skill.findOne({where: {name: "SCSS"}}) as Skill;
        jobSkill.skillId = skill.id;
        jobSkill.save();
    }
}