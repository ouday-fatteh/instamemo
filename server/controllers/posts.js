import mongoose from "mongoose";
import PostMessage from "../models/postMessages.js";

//  Getting posts

export const getPosts = async (req,res) => {
    const { page } = req.query;
    try {
        const LIMIT = 3 * page //10 posts per loading
        const total = await PostMessage.countDocuments();
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT);
        res.status(200).json({data:posts, totalPosts: total});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

// gettting one post

export const getPost = async (req,res) => {
    try {
        const postMessage = await PostMessage.findById(req.params.id);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(400).json({message:error.message});
        console.log(error);
    }
}

// Creating posts

export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new  PostMessage({...post,creatorId : req.userId});
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({message : error.message}); 
    }
   }


  // Updating posts

  export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

// Liking posts

  export const likePost = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) return res.status(401).send({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === req.userId.toString());

  if(index === -1){
    post.likes.push(req.userId);
  }else{
    post.likes = post.likes.filter((id) => id !== req.userId.toString());
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post , { new: true });
  
  res.json(updatedPost);
}

// Deleting posts

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findByIdAndDelete(id);
  
  res.json(post);
}

// Creating comments

export const createComment = async (req,res) => {
    const { id } = req.params;
  const { message, creator, creatorId, creatorImage } = req.body;
  const newComment = { message, creator, creatorId, creatorImage };
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { $push: { comments: newComment } }, { new: true });
      res.status(201).json(updatedPost);
  }
  catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error);
  }
}


export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { message, creator, creatorId, creatorImage } = req.body;
  const updatedComment = { message, creator, creatorId, creatorImage };
  try {
      const post = await PostMessage.findById(id);
      const index = post.comments.findIndex((comment) => comment._id === id);
      post.comments[index] = updatedComment;
      await post.save();
      res.json(post);
  }
  catch (error) {
      res.status(400).json({ message: error.message });
  }
}


export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
      const post = await PostMessage.findById(id);
      const index = post.comments.findIndex((comment) => comment._id === id);
      post.comments.splice(index, 1);
      await post.save();
      res.json(post);
  }
  catch (error) {
      res.status(400).json({ message: error.message });
  }
}
