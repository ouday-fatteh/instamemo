import express from 'express';
import { signin , signup , getUser ,finishingSignUp, followUser ,unfollowUser, getFollowers} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/user/:id',getUser);
router.patch('/finishingsignup/:id' ,auth, finishingSignUp);
router.post('/follow/:id', followUser);
router.delete('/unfollow/:id', unfollowUser);
router.get('/followers/:id', getFollowers);

export default router;