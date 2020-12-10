import axios from 'axios';
import * as actionTypes from './actionTypes';
import Cookies from 'universal-cookie';
const url="https://webshop-1-1.herokuapp.com"
const cookies = new Cookies();

export const editItemStart = () => {
    return {
        type:actionTypes.EDITITEM_START
    }
}


export const editItemSuccess = (status) => {
    return {
        type:actionTypes.EDITITEM_SUCCESS,
        status:status
    }
}


export const editItemFail = error => {
    return {
        type:actionTypes.EDITITEM_FAIL,
        error:error
    }
}

export const editItem= (item,price)=>{
    return async dispatch=>{
        dispatch(editItemStart())
        const token = cookies.get('token');
            const dataFromServer= await axios.get(url+"/api/"+item.id+"/") //Getting original data to check the version against
            .then(res=>{
                return res.data
            })
            console.log(dataFromServer)
            console.log(item.version)
            if(dataFromServer.version===item.version)
            {
            await axios.put(url+"/api/update/"+item.id+"/",{
                price:price,
                version:item.version+1
            },{
                headers: {
                    Authorization: 'JWT ' + token
                  }
            })
            .then(res=>{
                dispatch(editItemSuccess(res.status));
         
            })
            .catch(err=>{
                dispatch(editItemFail(err))
            })
        }
        else{
            dispatch(editItemFail({"message":"The item's status might have been changed already"}))
        }
      
    }

}