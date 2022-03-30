import * as api from '../api';


export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({type: 'FETCH_ALL' , payload: data});
    } catch (error) {
        console.log(error.message)
    }   
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPosts(post);
        dispatch({type:'CREATE' , payload : data})
    } catch (error) {
        console.log(error.message);
    }
} 

export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePosts(id, post);
      dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

    export const likePost = (id) => async (dispatch) => {
        try {
            const { data } = await api.likePosts(id);
            dispatch({ type: 'LIKE', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    }

    export const unLikePost = (id) => async (dispatch) => {
        try {
            const { data } = await api.unLikePosts(id);
            dispatch({ type: 'LIKE', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    }