import React from 'react'

export const CensorControl = ({id, updateFun}) => {
  return (
    <>  
        <button className="btn btn-primary accept-post" onClick={(id) => updateFun(id)}>&#128077;</button>
        
        <form className="post-form" action={"https://conf-api.onrender.com/api/post/"+String(id)} method="delete" >
            <button className="btn btn-primary reject-post">&#x1F44E;</button>
        </form>
    </>
  )
}
