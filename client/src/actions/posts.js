import * as api from '../api';


export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchPosts(page);
        
        dispatch({type: 'FETCH_ALL' , payload: data});
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message)
    }   
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchPost(id);
        dispatch({type: 'FETCH_ONE' , payload: data});
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.createPosts(post);
        dispatch({type:'CREATE' , payload : data})
        dispatch({ type: 'END_LOADING' });
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

    export const deletePost = (id) => async (dispatch) => {
        try {
            const { data } = await api.deletePosts(id);
            dispatch({ type: 'DELETE', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    }

    export const deleteImage = (id,type) => async (dispatch) => {
        try {
            const { data } = await api.deleteImage(id,type);
            dispatch({ type: 'DELETE', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    }

    export const createComment = (id, comment) => async (dispatch) => {
        try {
            dispatch({ type: 'START_LOADING' });
            const { data } = await api.createComment(id, comment);
            dispatch({ type: 'CREATE_COMMENT', payload: data });
            dispatch({ type: 'END_LOADING' });
        }
        catch (error) {
            console.log(error.message);
        }
    }