import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../database/models/User";
import bcrypt from "bcrypt";

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            console.log(username, password);

            try {
                const user = await User.findOne({ username });

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
    new JwtStrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );