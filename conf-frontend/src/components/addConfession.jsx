import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function AddConfession({url, count, setCount}) {
    const [Title, SetTitle] = useState('');
    const [Body, SetBody] = useState('');
    let [status, setStatus] =useState("no")
    let createPost = () => {
        if(Body != ""){
            const data = {
                title: Title,
                bodyText: Body
            }
            axios.post(url + '/api/post', data, {withCredentials: true})
                .then((res) => {
                    console.log('Created post')
                    setStatus("yes")
                })
                .catch((err) => console.log(err))
            SetTitle("")
            SetBody("")
            console.log("updating count")
            let nc = count + 1
            setCount(nc)
        }
    }

    useEffect(()=> {
        if(status == "yes"){
            setTimeout(()=> {
                setStatus("no")
            }, 1500)
        }
    }, [status])
    return (
        <>
            {status == "yes" ? "Post created, please wait for the admin to approve it!" : (
                <div className="addform">   
                <div className="mb-3">
                    <label htmlFor="confession" className="form-label">Enter Confession</label>
                    <textarea className="form-control" required id="confession" rows="3" value={Body} onChange={(e)=>SetBody(e.target.value)}></textarea>
                    
                </div>  
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Enter Title(optional)</label>
                    <input type="text" className="form-control" id="Title" placeholder="Title" value={Title} onChange={(e)=> SetTitle(e.target.value)}></input>
                </div>
                <button className="btn btn-primary" onClick={createPost}>Add New Confession</button>
                </div> 
            )}
            
        </>
    )
}
export default AddConfession;