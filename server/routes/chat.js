import express from 'express';
import { sendMessage , getConversation} from '../controllers/chat.js';

const router = express.Router();

router.post('/sendmessage',sendMessage);
router.get('/getconversation',getConversation);

export default router;