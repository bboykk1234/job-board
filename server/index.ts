import express from "express";
import path from "path";
import 'dotenv/config';
import "./database";
import "./middlewares/auth";
import passport from "passport";
import { login } from "./controllers/auth";
import jobRouter from "./routes/jobs";
import { ExpressJoiError } from "express-joi-validation";
import levelRouter from "./routes/levels";
import employmentTypeRouter from "./routes/employment_types";
import jobApplicationRouter from "./routes/job_applications";
import cors from "cors";
import skillRouter from "./routes/skills";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());

app.post("/api/auth/login", login);

app.get("/api/auth/users", passport.authenticate("jwt", { session: false }), (req: express.Request, res, next) => {
    res.json(req.user);
});

app.use("/api/jobs", jobRouter);
app.use("/api/levels", levelRouter);
app.use("/api/employment_types", employmentTypeRouter);
app.use("/api/job_applications", jobApplicationRouter);
app.use("/api/skills", skillRouter);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// NOTE: Custom error handler always last
// https://expressjs.com/en/guide/error-handling.html
app.use(
    (
        err: any | ExpressJoiError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (err && err.error && err.error.isJoi) {
            const e: ExpressJoiError = err
            res.status(400).json({
                type: e.type,
                details: e.error?.details,
            });
        } else {
            console.log(err);

            res.status(500).json({
                message: 'internal server error'
            });
        }
    }
);

app.listen(port, async () => {
    console.log(`Listening on port ${port}`)
});