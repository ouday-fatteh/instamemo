import express from 'express';
import { getPosts , createPost , updatePost ,likePost , deletePost , getPost} from '../controllers/posts.js';
import { deleteImage } from '../controllers/images.js';
import auth from '../middleware/auth.js';


 const router = express.Router();

router.get ('/posts' , getPosts);
router.get('/post/:id' , getPost);
router.post ('/posts' ,auth, createPost);
router.patch('/posts/:id' ,auth, updatePost);
router.patch('/posts/:id/like' ,auth, likePost);
router.delete('/posts/:id' ,auth, deletePost);
router.delete('/posts/image/:id', deleteImage);

export default router;