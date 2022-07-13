import * as api from '../api';


export const sendMessage = (sender,receiver,message,setMessages) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.sendMessage(sender,receiver,message);
        setMessages(data?.result.messages);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const getConversation = (sender,receiver,setMessages) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.getConversation(sender,receiver);
        setMessages(data?.result.messages);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const getConversations = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.getConversations(id);
        console.log(data);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}