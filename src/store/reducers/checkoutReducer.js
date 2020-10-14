import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    status:null,
    error:null,
    loading:false       
}

const checkOutStart=(state,action)=>{
    return updateObject(state,{
        error:null,
        loading:true
    });
}

const checkOutSuccess=(state,action)=>{
    return updateObject(state,{
        status:action.status,
        error:null,
        loading:false
    });
}
const checkOutFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}


 const checkOutReducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.CHECKOUT_START: return checkOutStart(state,action);
        case actionTypes.CHECKOUT_SUCCESS: return checkOutSuccess(state,action);
        case actionTypes.CHECKOUT_FAIL: return checkOutFail(state,action);
        default:
            return state;
    }
}
export default checkOutReducer;