import express from "express";
import { register, login,logout } from "../../controllers/Users/auth.js";
import passport from "passport";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Authenticate with Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }),(req,res)=>{
    res.send("Successful!!");
});
// Google OAuth callback route
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // Redirect or handle the user after authentication
  res.send("Successful!!");
});
// Logout route
router.get("/logout",logout);

export default router;
