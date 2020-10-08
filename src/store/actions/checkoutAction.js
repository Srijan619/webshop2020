import axios from 'axios';
import * as actionTypes from './actionTypes';


export const checkOutStart = () => {
    return {
        type:actionTypes.CHECKOUT_START
    }
}


export const checkOutSuccess = () => {
    return {
        type:actionTypes.CHECKOUT_SUCCESS,
        
    }
}


export const checkOutFail = error => {
    return {
        type:actionTypes.CHECKOUT_FAIL,
        error:error
    }
}

export const checkoutItem= (items,sold_to)=>{
    return dispatch=>{
        items.map(item=>{
            axios.put("http://127.0.0.1:8000/api/"+item.id+"/",{
                sold_status:true,
                sold_to:sold_to
            })
            .then(res=>{
                dispatch(checkOutSuccess())
            })
            .catch(err=>{
                dispatch(checkOutFail(err))
            })
        })
    }

}