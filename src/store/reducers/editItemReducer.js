import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    error:null,
    loading:false,
    status:null       
}

const editItemStart=(state,action)=>{
    return updateObject(state,{
        error:null,
        loading:true
    });
}

const editItemSuccess=(state,action)=>{
    return updateObject(state,{
        error:null,
        loading:false,
        status:action.status
    });
}
const editItemFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false,
    });
}


 const editItemReducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.EDITITEM_START: return editItemStart(state,action);
        case actionTypes.EDITITEM_SUCCESS: return editItemSuccess(state,action);
        case actionTypes.EDITITEM_FAIL: return editItemFail(state,action);
        default:
            return state;
    }
}
export default editItemReducer;