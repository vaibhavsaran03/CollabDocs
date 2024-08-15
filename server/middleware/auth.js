import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";
import User from "../schema/userSchema.js";

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();  // The user is authenticated, proceed to the next middleware
  } else {
    console.log("User not authenticated, right?");
    res.status(401).json({ msg: "Authorization denied, please log in" });
  }
};

export default auth;