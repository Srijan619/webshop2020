import axios from 'axios';
import * as actionTypes from './actionTypes';
import Cookies from 'universal-cookie';
const url="https://webshop-1-1.herokuapp.com/"
const cookies = new Cookies();
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

export const fetchLimitedDataSuccess=(items,next)=>{
    return {
        type:actionTypes.FETCH_LIMIT_SUCCESS,
        itemLimited:items,
        next:next
    }
}
export const searchItem=(items)=>{
    return {
        type:actionTypes.SEARCHITEMS,
        itemLimited:items,
      
    }
}
//Search items need to be done in the server side
export const searchItems = (keyword)=>{
    return async dispatch=>{
        dispatch(fetchStart())
        try {
            const res = await axios.get(url+"/api/search/?search="+keyword);
            const items = res.data.results;
            dispatch(searchItem(items));
        } catch (err) {
            dispatch(fetchFail(err));
        }
    }

}

export const getItems=()=>{
    return async dispatch=>{
        dispatch(fetchStart())
        try {
            const res = await axios.get(url+"/api/");
            const items = res.data;
            dispatch(fetchSuccess(items));
        } catch (err) {
            dispatch(fetchFail(err));
        }
    }

}

export const getItemsOnSale=(page)=>{
    return async dispatch=>{
        dispatch(fetchStart())
        try {
            const res = await axios.get(url+`/api/onsale/?page=${page}`);
            const items = res.data.results;
            const next=res.data.next
            dispatch(fetchLimitedDataSuccess(items,next));
         
        } catch (err) {
            dispatch(fetchFail(err));
        }
    }

}

export const addItems=(title,description,price,posted_by)=>{
    return async dispatch=>{
        dispatch(fetchStart)
        const token = cookies.get('token');
        await axios.post(url+"/api/add/",{
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

