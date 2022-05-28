import { GET_USER } from "../constants/actionTypes";

const user = (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
        return action.payload;
        case "FOLLOW" :
        return action.payload;
        case "UNFOLLOW" :
            return action.payload;
        default:
        return state;
    }
    }

    export default user;