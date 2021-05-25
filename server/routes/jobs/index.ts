import express from "express";
import { createValidator } from "express-joi-validation";
import passport from "passport";
import { saveJobBodySchema } from "../../requests/jobs";
import { create, get, list, update, getApplications, close } from "../../controllers/jobs";

const jobRouter = express.Router();
const validator = createValidator({ passError: true });

jobRouter.get("/:id", get);

jobRouter.get("/:id/applications", getApplications);

jobRouter.get("/", list);

jobRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validator.body(saveJobBodySchema),
    create
);

jobRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validator.body(saveJobBodySchema),
    update
);

jobRouter.post(
    "/:id/close",
    passport.authenticate("jwt", { session: false }),
    close
);

export default jobRouter;
