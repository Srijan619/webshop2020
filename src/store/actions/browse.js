import axios from 'axios';
import * as actionTypes from './actionTypes';


export const fetchStart = () => {
    return {
        type:actionTypes.FETCH_START
    }
}


export const fetchSuccess = items => {
    return {
        type:actionTypes.FETCH_SUCCESS,
        items:items
    }
}


export const fetchFail = error => {
    return {
        type:actionTypes.FETCH_FAIL,
        error:error
    }
}


export const getItems=()=>{
    return async dispatch=>{
        dispatch(fetchStart)
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/");
            const items = res.data;
            dispatch(fetchSuccess(items));
        } catch (err) {
            dispatch(fetchFail(err));
        }
    }

}
