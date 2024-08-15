import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import axios from "axios";
import passportConfig from "../utils/passport.js";
import User from "../schema/userSchema.js";
import auth from "../middleware/auth.js";

dotenv.config();

const router = express.Router();
console.log("auth.js");

// forwards the request to google for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//auth  user using google-oauth-20
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: `http://localhost:3000/login`,
  })
);

// Route to check if user is authenticated
router.get("/login/success",auth, (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
    });
    // console.log(req.user);
  } else {
    res.json({
      success: false,
      message: "user failed to authenticate.",
    });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy( (err)=> {
      if (err) {
       console.log("Error in destroying session: ", err);
       return next(err);
      }
      res.clearCookie("connect.sid");
      res.send("User logged out successfully");
    });
  });
});

export default router;
