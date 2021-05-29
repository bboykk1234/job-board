import passport from "passport";
import validate from "../../../extensions/RequestValidator";
import handler from "../../../extensions/RouteHandler";
import JobApplicationController from "../../../http/controllers/JobApplicationController";
import CreateJobApplicationRequestRules from "../../../http/requests/CreateJobApplicationRequestRules";
import formidable from "formidable";
import formParser from "../../../http/middlewares/FormParser";

export const config = {
    api: {
        bodyParser: false,
    },
}

handler
    .get(
        passport.authenticate("jwt", { session: false }),
        JobApplicationController.index
    )
    .post(
        formParser({ multiples: true, uploadDir: "storage/uploads", single: "resume" }),
        validate({ body: CreateJobApplicationRequestRules }),
        JobApplicationController.create
    )

export default handler