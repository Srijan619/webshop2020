import axios from 'axios';
import * as actionTypes from './actionTypes';


export const addStart = () => {
    return {
        type:actionTypes.ADDCART_START
    }
}


export const addSuccess = items => {
    return {
        type:actionTypes.ADDCART_SUCCESS,
        items:items
    }
}


export const addFail = error => {
    return {
        type:actionTypes.ADDCART_FAIL,
        error:error
    }
}


export const addToBasket=(item)=>{
    return  dispatch=>{
        dispatch(addStart)
        try{
            dispatch(addSuccess(item))
        }
        catch (error){
           dispatch(addFail(error))
        }
     
    }

}
