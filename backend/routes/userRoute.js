import express from "express";
import { bookmarks, follow, getMyProfile, Login, Logout, otherUsers, Register, unfollow } from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router=express.Router();

router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/logout').get(Logout);

router.route('/bookmark/:id').put(isAuthenticated,bookmarks);

router.route('/profile/:id').get(isAuthenticated,getMyProfile);

router.route('/otherusers/:id').get(isAuthenticated,otherUsers);

router.route('/follow/:id').post(isAuthenticated,follow);

router.route('/unfollow/:id').post(isAuthenticated,unfollow);

export default router;