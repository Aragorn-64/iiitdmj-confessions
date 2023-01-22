import axios from 'axios';
import React from 'react'
import { ReactSession }  from 'react-client-session';
import { CensorControl } from './censorControl';

export const Post = ({post, updateFun, deleteFun}) => {
  // console.log(post._id);

  
  let idString = String(post._id)
  // console.log(typeof(idString))

  return (
    <>
    <div className="card text-center post-item">
      <div className="card-body">
        {post.title ? (<h5 className="card-title">{post.title} </h5>) : ""}
        <p className="card-text">{post.bodyText}</p>
        {post.status == "pending" && ReactSession.get("authType") == "admin"? (<CensorControl id={idString} updateFun = {updateFun} deleteFun={deleteFun} /> ) : ""}
        <p className="card-subtitle mb-2 text-muted mb-1">{post.createdAt}</p>
      </div>
    </div>
    </>
  )
}
