import axios from 'axios';


const url = 'http://localhost:5000/api/posts';

export const fetchPosts = () => axios.get(url);
export const createPosts = (newPost) => axios.post(url,newPost);
export const updatePosts = (id,updatedPost) => axios.patch(`${url}/${id}`,updatedPost);
export const likePosts = (id) => axios.patch(`${url}/${id}/like`);
export const unLikePosts = (id) => axios.patch(`${url}/${id}/unlike`);