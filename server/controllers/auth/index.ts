import passport from "passport";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const login = async (req: Request, res: Response, next: NextFunction) => {
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

                    const token = jwt.sign({ user: body, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.JWT_SECRET as string);

                    return res.json({ token });
                }
            );
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};