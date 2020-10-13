import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    error:null,
    loading:false       
}

const changePasswordStart=(state,action)=>{
    return updateObject(state,{
        error:null,
        loading:true
    });
}

const changePasswordSuccess=(state,action)=>{
    return updateObject(state,{
        token:action.token,
        username:action.username,
        error:null,
        loading:false
    });
}
const changePasswordFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}


 const changePasswordReducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.CHANGEPASSWORD_START: return changePasswordStart(state,action);
        case actionTypes.CHANGEPASSWORD_SUCCESS: return changePasswordSuccess(state,action);
        case actionTypes.CHANGEPASSWORD_FAIL: return changePasswordFail(state,action);
        default:
            return state;
    }
}
export default changePasswordReducer;