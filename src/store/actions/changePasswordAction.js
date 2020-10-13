import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as cartAction from '../actions/cartAction'

export const changePasswordStart = () => {
    return {
        type:actionTypes.CHANGEPASSWORD_START
    }
}


export const changePasswordSuccess = () => {
    return {
        type:actionTypes.CHANGEPASSWORD_SUCCESS,
    }
}


export const changePasswordFail = error => {
    return {
        type:actionTypes.CHANGEPASSWORD_FAIL,
        error:error
    }
}

export const authChangePassword =  (oldPassword, newPassword1,newPassword2)=>{
    return (dispatch)=> {
        dispatch(changePasswordStart());
        let token=localStorage.getItem("token")
        axios.post("http://127.0.0.1:8000/rest-auth/password/change/",{
            old_password:oldPassword,
            new_password1:newPassword1,
            new_password2:newPassword2
        },{
            headers: {
                Authorization: 'Basic ' + token
              }
        })
        .then(res => {
            dispatch(changePasswordSuccess());
        })
        .catch(err =>{
            dispatch(changePasswordFail(err))
        })
    }
}

