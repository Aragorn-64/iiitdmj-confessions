import axios from 'axios';
import React from 'react'
import { ReactSession }  from 'react-client-session';
import { CensorControl } from './censorControl';

export const Post = ({post}) => {
  console.log(post._id);

  let update = async (id) => {
    axios.put("https://conf-api.onrender.com/api/post/"+String(id))
      .then(() => {
        console.log("Updated status of "+String(id)) 
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
    <div className="card text-center post-item">
      <div className="card-body">
        {post.title ? (<h5 className="card-title">Special title treatment</h5>) : ""}
        <p className="card-text">{post.bodyText}</p>
        {post.status == "pending" && ReactSession.get("authType") == "admin"? (<CensorControl id={post._id} updateFun = {update}/>) : ""}
        <p className="card-subtitle mb-2 text-muted mb-1">{post.createdAt}</p>
      </div>
    </div>
    </>
  )
}
