import { GET_USER } from '../constants/actionTypes';
import * as api from '../api';

export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUser(id);
        dispatch({ type: GET_USER, payload:data });
    } catch (error) {
        console.log(error)
    }
}


export const deleteImage = (id,type) => async (dispatch) => {
    try {
        const { data } = await api.deleteImage(id,type);
        dispatch({ type: 'DELETE', payload: data });  
    } catch (error) {
        console.log(error);
    }
}


export const finishingSignUp = (formData,user_id,history,updateLocalStorage) => async (dispatch) => {
    try {
        console.log(user_id,'     ',formData);
        const { data } = await api.finishingSignUp(formData,user_id);
        dispatch({ type: 'UPDATE', payload: data }); 
        updateLocalStorage();
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const followUser = (id,follower_id) => async (dispatch) => {
    try {
        const { data } = await api.followUser(id,follower_id);
        dispatch({ type: 'FOLLOW', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const unfollowUser = (id,unfollower_id) => async (dispatch) => {
    try {
        const { data } = await api.unfollowUser(id,unfollower_id);
        dispatch({ type: 'UNFOLLOW', payload: data });
    } catch (error) {
        console.log(error);
    }
}