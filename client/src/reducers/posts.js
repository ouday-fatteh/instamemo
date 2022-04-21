import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE , START_LOADING , END_LOADING ,CREATE_COMMENT} from '../constants/actionTypes';

const posts = (state = {isLoading : true , posts :  []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts : action.payload.data,
        totalPosts : action.payload.totalPosts
      };
    case LIKE:
      return {...state,posts : state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
    case CREATE:
      return {...state,posts : [...state.posts, action.payload]};
    case UPDATE:
      return {...state,posts : state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
    case DELETE:
      return {...state,posts : state.posts.filter((post) => post._id !== action.payload)} ;
    case CREATE_COMMENT:
      return {...state,posts : state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
    default:
      return posts;
  }
};

export default posts;