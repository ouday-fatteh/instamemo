import Conversation from '../models/conversations.js';

export const sendMessage = async (req,res) => {
    const { sender,receiver,message } = req.body;
    try {
        const conversation = await Conversation.findOne({ 
            participants : {$all:[sender,receiver]} 
        });
        
        if (!conversation) {
        const newConversation = new Conversation({ participants:[sender,receiver], messages: [{ sender, message }] });
        await newConversation.save();
        } else {
        conversation.messages.push({ sender, message });
        await conversation.save();
        }
        res.status(200).send({ result: conversation });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getConversation = async (req,res) => {
    const { id } = req.params;
    const { receiverId } = req.query;
    
    try {
        const conversation = await Conversation.findOne({ 
            participants : {$all:[id,receiverId]} 
        });
         
        if (!conversation) return res.status(404).send({ message: 'Conversation not found' });
        res.status(200).send({ result: conversation });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getConversations = async (req,res) => {
    const { id } = req.params;
    try {
        const conversations = await Conversation.find({ participants:{$all:[id]}  });
        if (!conversations) return res.status(404).send({ message: 'Conversations not found' });
        res.status(200).send({ result: conversations });
    } catch (error) {
        res.status(500).json(error);
    }
}