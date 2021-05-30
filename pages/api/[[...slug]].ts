import "dotenv/config"
import AuthController from "../../http/controllers/AuthController"
import { Model } from 'objection'
import knexConfig from '../../knexfile'
import Knex from "knex";
import passport from "passport"
import JobController from "../../http/controllers/JobController"
import EmploymentTypeController from "../../http/controllers/EmploymentTypeController"
import SkillController from "../../http/controllers/SkillController"
import LevelController from "../../http/controllers/LevelController"
import JobFunctionController from "../../http/controllers/JobFunctionController"
import SaveJobRequestRules from "../../http/requests/SaveJobRequestRules"
import handler from "../../extensions/RouteHandler";
import validate from "../../extensions/RequestValidator";
import JobApplicationController from "../../http/controllers/JobApplicationController";
import CompanyController from "../../http/controllers/CompanyController";

const knex = Knex(knexConfig);

Model.knex(knex)

type UserApiRequest = {
    params: {
        userId: string
    },
    login(user: {}, options: any, done: (err: any) => void): void;
}

handler
    .post<UserApiRequest>("/api/auth/login", AuthController.login)
    .get("/api/auth/users", passport.authenticate("jwt", { session: false }), AuthController.getUser)

handler
    .get("/api/jobs", JobController.index)
    .get("/api/jobs/:id", JobController.show)
    .post("/api/jobs",
        passport.authenticate("jwt", { session: false }),
        validate({ body: SaveJobRequestRules }),
        JobController.create
    )
    .put("/api/jobs/:id",
        passport.authenticate("jwt", { session: false }),
        validate({ body: SaveJobRequestRules }),
        JobController.update
    )
    .post("/api/jobs/:id/close",
        passport.authenticate("jwt", { session: false }),
        JobController.close
    )

handler
    .get("/api/companies", CompanyController.index)

handler
    .get("/api/employment_types", EmploymentTypeController.index)

handler
    .get("/api/skills", SkillController.index)

handler
    .get("/api/levels", LevelController.index)

handler
    .get("/api/job_functions", JobFunctionController.index)

handler
    .get("/api/job_applications/:id/resume",
        passport.authenticate("jwt", { session: false }),
        JobApplicationController.download
    )

export default handler;