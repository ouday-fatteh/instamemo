import { AUTH  } from '../constants/actionTypes';
import * as api from '../api'; 


export const signin = (formData,history) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        dispatch({ type: AUTH, payload:data });
        history.push('/');
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData,history,geoLocation) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, payload:data });
        console.log(data);
        history.push(`/finishingsignup?u_id=${data.result._id}&hl=${geoLocation.country}&hc=${geoLocation.countryCode}`);
    } catch (error) {
        console.log(error)
    }
}