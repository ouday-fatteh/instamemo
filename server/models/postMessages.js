import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title : String,
    message : String , 
    creator : String,
    tags : [String],
    selectedFile : String,
    likeCount : {
        type : Number,
        default : 0
    },
    comments: [String],
    shareCount: {
        type: Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const PostMessage = mongoose.model('postMessage',postSchema);
export default PostMessage;