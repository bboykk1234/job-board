import express from "express";
import path from "path";
import 'dotenv/config';
import "./database";
import "./middlewares/auth";
import { User } from "./database/models/User";
import passport from "passport";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

app.post("/api/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');

                return next(error);
            }

            req.login(
                user,
                { session: false },
                async (error) => {
                    if (error) return next(error);

                    const body = { _id: user._id, username: user.username, createdAt: user.createdAt, updatedAt: user.updatedAt };
                    const token = jwt.sign({ user: body, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'TOP_SECRET');

                    return res.json({ token });
                }
            );
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

app.get("/api/users/profile", passport.authenticate("jwt", { session: false }), (req: express.Request, res, next) => {
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
    });
});

app.get("/api/jobs", async (req, res) => {
    const user = await User.find();
    res.json(user);
});

app.post("/api/jobs", (req, res) => {
    res.json({
        message: "Hello World!!!",
    });
});

app.put("/api/jobs", (req, res) => {
    res.json({
        message: "Hello World!!!",
    });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, async () => {
    console.log(`Listening on port ${port}`)
});