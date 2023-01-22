import React from "react";
import axios from "axios";
import { useState } from "react";

function AddConfession() {
    const [Title, SetTitle] = useState('');
    const [Body, SetBody] = useState('');
    let createPost = () => {
        const data = {
            tiltle: Title,
            body: Body
        }
        axios.post('http://localhost:5000/confessions/add', data)
            .then((res) => {
                console.log('Created post')
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
           <div className="addform">     
            <div class="mb-3">
                <label for="title" class="form-label">Enter Title(optional)</label>
                <input type="text" class="form-control" id="Title" placeholder="Title" value={Title} onChange={(e)=> SetTitle(e.target.value)}></input>
            </div>
            <div class="mb-3">
                <label for="confession" class="form-label">Enter Confession</label>
                <textarea class="form-control" id="confession" rows="3" value={Body} onChange={(e)=>SetBody(e.target.value)}></textarea>
                
            </div>
            <button className="btn btn-primary" onClick={createPost}>Add New Confession</button>
            </div>  
        </>
    )
}
export default AddConfession;