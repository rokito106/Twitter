import mongoose from "mongoose";
import { User } from "./UserSchema.js";

const twitterSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    like: {
        type: Array,
        default: []
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    userDetails:{
        type:Array,
        default:[]
    }

}, { timestamps: true })


export const Tweet = mongoose.model("Tweet", twitterSchema);