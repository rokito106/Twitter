import { User } from "../models/UserSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // basic validation-----------------------------------------

        if (!name || !username || !email || !password) {
            return res.status(401).json({
                msg: "All fiels are required",
                success: false
            })
        }
        const user = await User.findOne({ email });

        if (user) {
            return res.status(401).json({
                msg: "User already exist",
                success: false
            })
        }

        const hashpassword = await bcryptjs.hash(password, 16);

        await User.create({
            name,
            username,
            email,
            password: hashpassword
        })

        return res.status(200).json({
            msg: "Account created successfully",
            success: true
        })
    }

    catch (error) {
        console.log(error);
    }

}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                msg: "All fiels are required",
                success: false
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "No user found",
                success: false
            })
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                msg: "Incorrect email and password",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    }

    catch (error) {
        console.log(error)
    }
}

export const Logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "Logged out successfully.",
        success: true
    })
}

export const bookmarks = async (req, res) => {
    try {
        const LogggedInUserId = req.body.id;
        const TweetId = req.params.id;
        const user = await User.findById(LogggedInUserId);
        if (user.bookmark.includes(TweetId)) {
            // remove-------------------------->
            await User.findByIdAndUpdate(LogggedInUserId, { $pull: { bookmark: TweetId } });
            return res.status(200).json({
                message: "Remove from bookmark",
                success: true
            })
        }
        else {
            // add------------------------------------------->
            await User.findByIdAndUpdate(LogggedInUserId, { $push: { bookmark: TweetId } });
            return res.status(200).json({
                message: "Saved in bookmark",
                success: true
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getMyProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({
            user,
        })
    } catch (error) {
        console.log(error);
    }
}

export const otherUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const otherusers = await User.find({ _id: { $ne: id } }).select("-password");
        if (!otherusers) {
            return res.status(401).json({
                message: "No other user found"
            })
        }
        return res.status(200).json({
            otherusers
        })
    } catch (error) {
        console.log(error)
    }
}

export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loginUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);
        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loginUser.updateOne({ $push: { followings: userId } });
        }
        else {
            return res.status(400).json({
                message: `${loginUser.name} already followed ${user.name}`
            });
        }
        return res.status(200).json({
            message: `${loginUser.name} just follow to ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loginUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);
        if (user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loginUser.updateOne({ $pull: { followings: userId } });
        }
        else {
            return res.status(400).json({
                message: "You do not follow yet"
            });
        }
        return res.status(200).json({
            message: `${loginUser.name} unfollow to ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}