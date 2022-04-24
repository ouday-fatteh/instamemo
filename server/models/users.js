import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
        required: true
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
        type: [String],
        default:''
    },
    followers: {
        type: [String],
        default:''
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