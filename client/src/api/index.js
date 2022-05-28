import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/api' });
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('profile');
    if (token) {
        req.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    }
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPosts = (newPost) => API.post('/posts',newPost);
export const updatePosts = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);
export const likePosts = (id) => API.patch(`/posts/${id}/like`);
export const createComment = (id,comment) => API.patch(`/posts/${id}/comment`,comment);
export const deletePosts = (id) => API.delete(`/posts/${id}`);
export const deleteImage = (id,type) => API.delete(`/posts/image/${id}?type=${type}`);
export const fetchPost = (id) => API.get(`/post/${id}`);


export const signin = (formData) => API.post('/user/signin',formData);
export const signup = (formData) => API.post('/user/signup',formData);
export const finishingSignUp = (formData,user_id) => API.patch(`/user/finishingsignup/${user_id}`,formData);
export const followUser = (id,followerId) => API.post(`/user/follow/${id}?followerId=${followerId}`);
export const unfollowUser = (id,unfollowerId) => API.delete(`/user/unfollow/${id}?unfollowerId=${unfollowerId}`);

export const getUser = (id) => API.get(`/user/user/${id}`);

