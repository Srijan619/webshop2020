import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    items:[],
    error:null,
    loading:false,
    itemLimited:[],
    next:"has" 
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

const fetchLimitedDataSuccess=(state,action)=>{
    let joinArray=[]
    joinArray=Array.from([...state.itemLimited,...action.itemLimited]);
    let uniqueArray = joinArray.filter( (ele, ind) => ind === joinArray.findIndex( elem => elem.jobid === ele.jobid && elem.id === ele.id)) //Removing duplicates after concatination

    return updateObject(state,{
        itemLimited:uniqueArray,
        error:null,
        loading:false,
        next:action.next
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
        itemLimited:action.itemLimited,
        error:null,
        loading:false
    });
}


 const browseReducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.FETCH_START: return fetchStart(state,action);
        case actionTypes.FETCH_SUCCESS: return fetchSuccess(state,action);
        case actionTypes.FETCH_LIMIT_SUCCESS: return fetchLimitedDataSuccess(state,action);
        case actionTypes.FETCH_FAIL: return fetchFail(state,action);
        case actionTypes.SEARCHITEMS: return searchItems(state,action);
        default:
            return state;
    }
}
export default browseReducer;