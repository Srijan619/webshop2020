import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    items:[],
    error:null,
    loading:false,
    hasMore:true,
    offset:0,
    limit:20 ,
    itemLimited:[]    
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

const fetchLimitSuccess=(state,action)=>{
    return updateObject(state,{
        itemLimited:[...state.itemLimited,action.itemLimited],
        error:null,
        loading:false,
        offset:action.offset
    });
}
const fetchFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}

const searchItems=(state,action)=>{
    return updateObject(state,{
        items:action.items,
        error:null,
        loading:false
    });
}


 const browseReducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.FETCH_START: return fetchStart(state,action);
        case actionTypes.FETCH_SUCCESS: return fetchSuccess(state,action);
        case actionTypes.FETCH_LIMIT_SUCCESS: return fetchLimitSuccess(state,action);
        case actionTypes.FETCH_FAIL: return fetchFail(state,action);
        case actionTypes.SEARCHITEMS: return searchItems(state,action);
        default:
            return state;
    }
}
export default browseReducer;