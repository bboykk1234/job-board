import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../../models/User";
import bcrypt from "bcrypt";

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await User.query().findOne({ username });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await bcrypt.compare(password, user.password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    "jwt",
    new JwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET as string,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            console.log(token)
            try {
                done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

export default passport;