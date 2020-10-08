import axios from 'axios';
import * as actionTypes from './actionTypes';


export const fetchStart = () => {
    return {
        type:actionTypes.FETCH_START
    }
}


export const fetchSuccess = items => {
    return {
        type:actionTypes.FETCH_SUCCESS,
        items:items
    }
}


export const fetchFail = error => {
    return {
        type:actionTypes.FETCH_FAIL,
        error:error
    }
}

// export const getItems=(all)=>{
//     return async dispatch=>{
//         dispatch(fetchStart)
//         try {
//             const res = await axios.get("http://127.0.0.1:8000/api/");
//             const items = res.data;
//             let filteredData=[];
//             if(all===true){
//                 items.map(i=>{
//                     if(!i.sold_status)
//                     {
//                         filteredData.push(i)
                    
//                     }
//                 })
//                 dispatch(fetchSuccess(filteredData));
//             }
//             else if(all===false){
//                filteredData=[]
//                items.map(i=>{
//                 if(i.sold_status)
//                 {
//                     filteredData.push(i)
                
//                 }
//             })
//             dispatch(fetchSuccess(filteredData));
//             }
//             else{
//                 dispatch(fetchSuccess(items))
//             }
           
//         } catch (err) {
//             dispatch(fetchFail(err));
//         }
//     }

// }
export const getItems=()=>{
    return async dispatch=>{
        dispatch(fetchStart)
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/");
            const items = res.data;
            dispatch(fetchSuccess(items));
        } catch (err) {
            dispatch(fetchFail(err));
        }
    }

}


export const addItems=(title,description,price,posted_by)=>{
    return async dispatch=>{
        dispatch(fetchStart)
        await axios.post("http://127.0.0.1:8000/api/",{
            title:title,
            description:description,
            price:price,
            posted_by:posted_by
        })
        .then(res => {
            dispatch(fetchSuccess(res.data))
            dispatch(getItems())
        })
        .catch(err =>{
            dispatch(fetchFail(err))
        })
    }

}
