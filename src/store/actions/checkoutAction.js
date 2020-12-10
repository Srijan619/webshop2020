import axios from 'axios';
import * as actionTypes from './actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const url="https://webshop-1-1.herokuapp.com/"
export const checkOutStart = () => {
    return {
        type:actionTypes.CHECKOUT_START
    }
}


export const checkOutSuccess = (status) => {
    return {
        type:actionTypes.CHECKOUT_SUCCESS,
        status:status
        
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
        dispatch(checkOutStart())
        const token = cookies.get('token');
        items.map(async item=>{
            const dataFromServer=await axios.get(url+"/api/"+item.id+"/") //Getting original data to check the version against
            .then(res=>{
                return res.data
            })
            if(dataFromServer.version===item.version){
                await axios.put(url+"/api/update/"+item.id+"/",{
                    sold_status:true,
                    sold_to:sold_to,
                    version:item.version+1
                },{
                    headers: {
                        Authorization: 'JWT ' + token
                      }
                })
                .then(res=>{
                    dispatch(checkOutSuccess(res.status))
                })
                .catch(err=>{
                    dispatch(checkOutFail(err))
                })
        }
        else{
            dispatch(checkOutFail({"message":"The price/status for some items might have been changed!"}))
        }
        })
    }

}