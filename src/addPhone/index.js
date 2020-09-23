import React, { useState} from 'react';

function Index(props) {
    const url = "https://test-django-react-app1.herokuapp.com/api/";

    const [name, setName]=useState("");
    const [number, setNumber]=useState("");

    const postData = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name,number:number })
        };
       await fetch(url, requestOptions)
      
        
    }
    return (
        <div style={style.root}>
            <textarea placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}></textarea>
            <textarea placeholder="Name" value={number} onChange={(e)=>{setNumber(e.target.value)}}></textarea>
            <button onClick={postData}>Add</button>
        </div>
    );
}

export default Index;
const style = {
    root: {
        padding: 5,
        display: 'flex',
        flexDirection: 'row'
    }
}