import express from "express";
import { createValidator } from "express-joi-validation";
import passport from "passport";
import { create, get, list, download } from "../../controllers/job_applications";
import { postJobApplicationBodySchema } from "../../requests/job_applications";
import multer from "multer";

const jobApplicationRouter = express.Router();
const validator = createValidator({ passError: true });
const upload = multer({ dest: "storage/uploads" });


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

jobApplicationRouter.get(
    "/:id/download",
    passport.authenticate("jwt", { session: false }),
    download
);

export default jobApplicationRouter;
