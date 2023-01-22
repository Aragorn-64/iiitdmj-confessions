import React from "react";
import axios from "axios";
import { useState } from "react";
function AddConfession(){
   const [Title,SetTitle] = useState('');
   const [Body,SetBody] = useState('');
   function PostData(e){
   e.preventDefault();
    const data = {
        title: Title,
        body: Body
   }
   axios.post('https://conf-api.onrender.com/api/post/',data)
    .then(res => console.log(res.data))
}  
   return(
    <>
    <div>
        <form onSubmit={PostData}>    
            <input type="text" placeholder="Enter title(optional)" value={Title} onChange={(e)=> SetTitle(e.target.value)}></input>
            <input type="text" placeholder="Enter confession" value={Body} onChange={(e)=>SetBody(e.target.value)}></input>
            <input  type="submit" className="btn btn-primary">Add New Confession</input>
        </form>
     </div>
    </>
   )
}
export default AddConfession;