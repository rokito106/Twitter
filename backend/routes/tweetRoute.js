import express from "express";
import {createTweet, deleteTweet, getAllTweets, getfollowingTweets, LikeorDislike } from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route('/create').post(isAuthenticated, createTweet);

router.route('/delete/:id').delete(deleteTweet);

router.route('/like/:id').put(LikeorDislike);

router.route('/alltweets/:id').get(getAllTweets);

router.route('/allfollowingtweets/:id').get(getfollowingTweets);

export default router;