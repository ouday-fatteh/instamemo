import express from 'express';
import { sendMessage , getConversation , getConversations} from '../controllers/chat.js';

const router = express.Router();

router.post('/sendmessage',sendMessage);
router.get('/getconversation/:id',getConversation);
router.get('/getconversations',getConversations);

export default router;