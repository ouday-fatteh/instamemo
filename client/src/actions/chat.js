import * as api from '../api';


export const sendMessage = (sender,receiver,message) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.sendMessage(sender,receiver,message);
        dispatch({ type: 'SEND_MESSAGE', payload: data });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}
