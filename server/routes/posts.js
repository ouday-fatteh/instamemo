import express from 'express';
import { getPosts , createPost , updatePost ,likePost , unlikePost , deletePost} from '../controllers/posts.js';
import { deleteImage } from '../controllers/images.js';

 const router = express.Router();

router.get ('/posts' , getPosts);
router.post ('/posts' , createPost);
router.patch('/posts/:id' , updatePost);
router.patch('/posts/:id/like' , likePost);
router.patch('/posts/:id/unlike' , unlikePost);
router.delete('/posts/:id' , deletePost);
router.delete('/posts/image/:id' , deleteImage);

export default router;