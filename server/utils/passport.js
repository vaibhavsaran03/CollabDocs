import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../schema/userSchema.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

// console.log("passport.js");
// Passport config
const passportConfig = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "lax",
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:9000/auth/google/callback",
        scope: ["email", "profile"],
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log("GProfile:", profile);
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              image: profile.photos[0].value,
            });
            await newUser.save();
            return done(null, newUser);
          }
        } catch (error) {
          console.error("Error in Google Strategy:", error);
          return done(error, null);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};
export default passportConfig;
