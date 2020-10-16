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

export const fetchLimitedDataSuccess=(items,offset,limit)=>{
    return {
        type:actionTypes.FETCH_LIMIT_SUCCESS,
        itemLimited:items,
        offset:offset+limit
    }
}
//Search items need to be done in the server side
export const searchItems = (keyword)=>{
    return async dispatch=>{
        dispatch(fetchStart)
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/search/?search="+keyword);
            const items = res.data;
            dispatch(fetchSuccess(items));
        } catch (err) {
            dispatch(fetchFail(err));
        }
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


export const addItems=(title,description,price,posted_by)=>{
    return async dispatch=>{
        dispatch(fetchStart)
        let token=localStorage.getItem("token")
        await axios.post("http://127.0.0.1:8000/api/add/",{
            title:title,
            description:description,
            price:price,
            posted_by:posted_by
        },{
            headers: {
                Authorization: 'JWT ' + token
              }
        })
        .then(res => {
            dispatch(fetchSuccess(res.data))
            dispatch(getItems())
        })
        .catch(err =>{
            dispatch(fetchFail(err))
        })
    }

}

export const getLimitedItems  = (offset,limit)=>{
    return async dispatch=>{
        dispatch(fetchStart)
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/?limit=${limit}&offset=${offset}`);
            const items = res.data;
            dispatch(fetchLimitedDataSuccess(items,offset,limit));
        } catch (err) {
            dispatch(fetchFail(err));
        }
    }
}
