import { Tweet } from "../models/twitterSchema.js";
import { User } from "../models/UserSchema.js";

export const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: "Fields are required",
                success: false
            })
        }
        const user=await User.findById(id);

        await Tweet.create({
            description,
            UserId: id,
            userDetails:user
        })

        return res.status(201).json({
            message: "Tweet created successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }

}

export const deleteTweet = async (req, res) => {
    try {

        const { id } = req.params
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error)
    }

}

export const LikeorDislike = async (req, res) => {
    try {
        const LogggedInUserId = req.body.id;
        const TweetId = req.params.id;
        const user = await User.findById(LogggedInUserId);
        const tweet = await Tweet.findById(TweetId);
        if (tweet.like.includes(LogggedInUserId)) {
            // Dislike---------------------------------
            await Tweet.findByIdAndUpdate(TweetId, { $pull: { like: LogggedInUserId } });
            return res.status(200).json({
                message: `${user.name} disliked your tweet`,
                success: true
            })
        }
        else {
            // Like-------------------------------------
            await Tweet.findByIdAndUpdate(TweetId, { $push: { like: LogggedInUserId } });
            return res.status(200).json({
                message: `${user.name} liked your tweet`,
                success: true
            })
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const getAllTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loginUser = await User.findById(id);
        const loginUserTweet = await Tweet.find({ UserId: id });
        const followingUserTweet = await Promise.all(loginUser.followings.map((otherUsersId) => {
            return Tweet.find({ UserId: otherUsersId })
        }));
        return res.status(200).json({
            tweets: loginUserTweet.concat(...followingUserTweet)
        })
    } catch (error) {
        console.log(error)
    }

}

export const getfollowingTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loginUser = await User.findById(id);
        const followingUserTweet = await Promise.all(loginUser.followings.map((otherUsersId) => {
            return Tweet.find({ UserId: otherUsersId })
        }));
        return res.status(200).json({
            tweets: [].concat(...followingUserTweet)
        })
    } catch (error) {
        console.log(error)
    }

}