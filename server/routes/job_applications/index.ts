import express from "express";
import { createValidator } from "express-joi-validation";
import passport from "passport";
import { create, get, list } from "../../controllers/job_applications";
import { postJobApplicationBodySchema } from "../../requests/job_applications";
import multer from "multer";

const jobApplicationRouter = express.Router();
const validator = createValidator({ passError: true });
const upload = multer({ dest: "tmp/uploads/" });

jobApplicationRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    get
);

jobApplicationRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    list
);

jobApplicationRouter.post(
    "/",
    upload.single("resume"),
    validator.body(postJobApplicationBodySchema),
    create
);

export default jobApplicationRouter;
