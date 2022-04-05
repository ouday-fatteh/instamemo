import express from 'express';
import { getPosts , createPost , updatePost ,likePost , unlikePost , deletePost} from '../controllers/posts.js';
import { deleteImage } from '../controllers/images.js';
import auth from '../middleware/auth.js';


 const router = express.Router();

router.get ('/posts' , getPosts);
router.post ('/posts' ,auth, createPost);
router.patch('/posts/:id' ,auth, updatePost);
router.patch('/posts/:id/like' ,auth, likePost);
router.patch('/posts/:id/unlike' ,auth, unlikePost);
router.delete('/posts/:id' ,auth, deletePost);
router.delete('/posts/image/:id',auth , deleteImage);

export default router;