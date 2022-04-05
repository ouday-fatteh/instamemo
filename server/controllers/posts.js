import mongoose from "mongoose";
import PostMessage from "../models/postMessages.js";

//  Getting posts

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

// Creating posts

export const createPost = async (req,res) => {
    const post = req.body;

    const newPost = new  PostMessage({...post,creatorId : req.userId});
    console.log(req.body);
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

// Unliking posts 

export const unlikePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount - 1 }, { new: true });
  
  res.json(updatedPost);
}

// Deleting posts

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findByIdAndDelete(id);
  
  res.json(post);
}
