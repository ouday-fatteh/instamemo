import express from 'express';
import { getPosts , createPost , updatePost ,likePost , unlikePost} from '../controllers/posts.js';

 const router = express.Router();

router.get ('/posts' , getPosts);
router.post ('/posts' , createPost);
router.patch('/posts/:id' , updatePost);
router.patch('/posts/:id/like' , likePost);
router.patch('/posts/:id/unlike' , unlikePost);

export default router;