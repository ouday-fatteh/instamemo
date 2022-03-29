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
    const newPost = new  PostMessage(post);
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({message : error.message}); 
    }
   }


  // Updating posts

  export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if(mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post found with that id');
    const updatedPost = await postMessage.findByIdAndUpdate(_id,post,{new:true});
    res.json(updatedPost);
  }