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

export const editItem= (item,price)=>{
    return async dispatch=>{
        dispatch(editItemStart)
           let token=localStorage.getItem("token")
            const dataFromServer= await axios.get("http://127.0.0.1:8000/api/"+item.id+"/") //Getting original data to check the version against
            .then(res=>{
                return res.data
            })
            console.log(dataFromServer)
            console.log(item.version)
            if(dataFromServer.version===item.version)
            {
            await axios.put("http://127.0.0.1:8000/api/update/"+item.id+"/",{
                price:price,
                version:item.version+1
            },{
                headers: {
                    Authorization: 'JWT ' + token
                  }
            })
            .then(res=>{
                dispatch(editItemSuccess(res.data,res.status))
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