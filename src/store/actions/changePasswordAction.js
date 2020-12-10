import axios from 'axios';
import * as actionTypes from './actionTypes';
import Cookies from 'universal-cookie';
const url="https://webshop-1-1.herokuapp.com"
const cookies = new Cookies();
export const changePasswordStart = () => {
    return {
        type:actionTypes.CHANGEPASSWORD_START,
        status:null
    }
}


export const changePasswordSuccess = (status) => {
    return {
        type:actionTypes.CHANGEPASSWORD_SUCCESS,
        status:status
    }
}


export const changePasswordFail = error => {
    return {
        type:actionTypes.CHANGEPASSWORD_FAIL,
        error:error,
        status:null
    }
}

export const authChangePassword =  (oldPassword, newPassword1,newPassword2,history)=>{
    return (dispatch)=> {
        dispatch(changePasswordStart());
        const token = cookies.get('token');
        axios.post(url+"/rest-auth/password/change/",{
            old_password:oldPassword,
            new_password1:newPassword1,
            new_password2:newPassword2
        },{
            headers: {
                Authorization: 'JWT ' + token
              }
        })
        .then(res => {
            dispatch(changePasswordSuccess(res.status));
            history.push("/main/")
        })
        .catch(err =>{
            dispatch(changePasswordFail(err))
            history.push("/main/change_password")
        })
    }
}

