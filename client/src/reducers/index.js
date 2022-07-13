import { combineReducers } from "redux";
import posts from './posts';
import post from "./post";
import auth from './auth';
import user from './user';



export default combineReducers ({posts,post,auth,user});