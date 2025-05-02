import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
}, {timeseriestamps: true});

//this timestamp is used to record the 2 things
// 1. track the time of creation of the user
// 2. track the time of update of the user

const User = mongoose.model("User", userSchema);

export default User; 
