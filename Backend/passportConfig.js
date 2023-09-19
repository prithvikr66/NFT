import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from './models/Users/user.js';

export const initializingPassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
      done(null, user);
    });
  });
  passport.use(
    new GoogleStrategy(
      {
        // Your Google OAuth 2.0 credentials
        clientID:"214151504346-t18sfn6lqmsio920foqunm9g38s124ro.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback", 
      },
      (accessToken, refreshToken, profile, done) => {
        // Check if user already exists in your database
      UserModel.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            // Create a new user in your database
            new UserModel({ googleId: profile.id }).save().then((user) => {
              done(null, user);
            });
          }
        });
      }
    )
  );
};
