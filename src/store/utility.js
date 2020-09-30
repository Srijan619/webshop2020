
// This function helps to update the old state to the new state
export const updateObject =(oldObject, updatedProperties)=> {
    return {
        ...oldObject,
        ...updatedProperties
    }
}