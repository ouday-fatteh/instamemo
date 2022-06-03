import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname : {
        type: String
    },
    country : {
        type: String
    },
    phone : {
        type: String
    },
    bio : {
        type : String
    },
    gender: {
        type : String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default:''
    },
    birthDate: {
        type: Date,
    },
    coverImage: {
        type: String,
        default:''
    },
    bio: {
        type: String,
        default:''
    },
    interests: {
        type: [String],
        default:''
    },
    following: {
        type: [String]
    },
    followers: {
        type: [String]
    },
    hasFinishedSignUp : {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    Registerdate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("User", userSchema);