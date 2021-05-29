import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import passport from "../middlewares/Authentication";
import jwt from "jsonwebtoken";

type UserApiRequest = {
    params: {
        userId: string
    },
    login(user: {}, options: any, done: (err: any) => void): void;
}

export default class AuthController {
    static login(req: UserApiRequest, res: NextApiResponse, next: NextHandler) {
        passport.authenticate("login", async (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(401).json({ message: "Unauthorized" });
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        let body = {
                            _id: user._id,
                            ...user
                        };
                        delete body.password;

                        const token = jwt.sign(
                            { user: body },
                            process.env.JWT_SECRET as string,
                            { expiresIn: "7d" }
                        );

                        return res.json({ token });
                    }
                );
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    }

    static getUser(req: { user: {} }, res: NextApiResponse) {
        res.json(req.user);
    }
}