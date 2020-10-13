import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as cartAction from '../actions/cartAction'

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}


export const authSuccess = (token,username) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        username:username
    }
}


export const authFail = error => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
 
    return {
        type: actionTypes.AUTH_LOGOUT,
        username:null
    }
}
export const checkAuthTimeout=expirationTime=>{
    return dispatch=>{
        setTimeout(()=>{
             dispatch(logout());
        },expirationTime * 1000)
    }
}

export const authLogin =  (username, password)=>{
    return (dispatch)=> {
        dispatch(authStart());
         axios.post("http://127.0.0.1:8000/api-token-auth/",{
            username:username,
            password:password
        })
        .then(res => {
            const token=res.data.token;
            const expirationDate=new Date(new Date().getTime()+3600* 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('username',username);
            dispatch(authSuccess(token,username));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err =>{
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1,password2)=>{
    return dispatch=> {
        dispatch(authStart());
        axios.post("http://127.0.0.1:8000/rest-auth/registration/",{
            username:username,
            email:email,
            password1:password1,
            password2:password2
        })
        .then(res => {
            const token=res.data.key;
            const expirationDate=new Date(new Date().getTime()+3600* 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('username',username);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err =>{
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = ()=>{
    return dispatch => {
        const token=localStorage.getItem('token');
        const username=localStorage.getItem('username')
        if(token===undefined){
            dispatch(logout());
            dispatch(cartAction.clearBasket())
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<= new Date()){
                dispatch(logout());
                dispatch(cartAction.clearBasket())
            }
            else{
                dispatch(authSuccess(token,username));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}