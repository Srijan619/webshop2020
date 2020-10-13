import axios from 'axios';
import * as actionTypes from './actionTypes';


export const editItemStart = () => {
    return {
        type:actionTypes.EDITITEM_START
    }
}


export const editItemSuccess = (item,status) => {
    return {
        type:actionTypes.EDITITEM_SUCCESS,
        item:item,
        status:status
    }
}


export const editItemFail = error => {
    return {
        type:actionTypes.EDITITEM_FAIL,
        error:error
    }
}

export const editItem= (id,price)=>{
    return dispatch=>{
            axios.put("http://127.0.0.1:8000/api/"+id+"/",{
                price:price,
            })
            .then(res=>{
                dispatch(editItemSuccess(res.data,res.status))
                console.log(res.status)
            })
            .catch(err=>{
                dispatch(editItemFail(err))
            })
      
    }

}