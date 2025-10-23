import express from "express";
import handleAsyncErr from "../utils/handleAsyncErr.js";
import { SignInUser,SignUpUser,LogOutUser,refreshToken } from "../controllers/user.controller.js";
const router = express.Router()

//signup route
router.post('/signup', handleAsyncErr(SignUpUser));

//signin route
router.post('/signin', handleAsyncErr(SignInUser));

//logout route
router.post('/logout', handleAsyncErr(LogOutUser));

//refreshtoken route
router.post('/token', handleAsyncErr(refreshToken));

export default router;

