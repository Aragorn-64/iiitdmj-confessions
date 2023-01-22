import React from 'react'
import { LogoutBtn } from './logoutBtn'

export const Header = ({status, auth, logoutFun}) => {
  return (
    <div className="header">
        <h1 className='title'>IIITDMJ Confessions</h1> 
        
        {!auth || auth=="noauth"? 
        "" : 
        (<>
            <button className='create-post-btn btn btn-primary' data-bs-toggle="modal" data-bs-target="#createModal">Post a Confession!</button>
            <LogoutBtn logoutFun={logoutFun}/>
        </>)} 
    </div>
  )
}
