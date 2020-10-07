import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    items:[],
    error:null,
    loading:false       
}

const fetchStart=(state,action)=>{
    return updateObject(state,{
        error:null,
        loading:true
    });
}

const fetchSuccess=(state,action)=>{
    return updateObject(state,{
        items:action.items,
        error:null,
        loading:false
    });
}
const fetchFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}

const addFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}


 const browseReducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.FETCH_START: return fetchStart(state,action);
        case actionTypes.FETCH_SUCCESS: return fetchSuccess(state,action);
        case actionTypes.FETCH_FAIL: return fetchFail(state,action);
        default:
            return state;
    }
}
export default browseReducer;