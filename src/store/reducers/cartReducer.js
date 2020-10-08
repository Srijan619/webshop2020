import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    items:[],
    error:null,
    loading:false       
}

const addStart=(state,action)=>{
    return updateObject(state,{
        error:null,
        loading:true
    });
}

const addSuccess=(state,action)=>{
    return updateObject(state,{
        items:[...state.items,action.items],
        error:null,
        loading:false
    });
}
const addFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}
const removeItem=(state,action)=>{
    console.log(state)
    console.log(action)
    return updateObject(state,{
        items:state.items.filter((item)=>item.id!==action.items.id),
        error:action.error,
        loading:false
    });
}


const clearBasket=(state,action)=>{
    return updateObject(state,{
        items:[],
    });
}


 const cartReducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.ADDCART_START: return addStart(state,action);
        case actionTypes.ADDCART_SUCCESS: return addSuccess(state,action);
        case actionTypes.ADDCART_FAIL: return addFail(state,action);
        case actionTypes.CLEARCART: return clearBasket(state,action);
        case actionTypes.REMOVECARTITEM: return removeItem(state,action);
        default:
            return state;
    }
}
export default cartReducer;