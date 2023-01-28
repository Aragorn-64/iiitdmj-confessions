import React from 'react'

export const CensorControl = ({id, updateFun, deleteFun}) => {
  // console.log(id)
  return (
    <>  
        <button className="btn btn-primary btn-sm accept-post" onClick={() => updateFun(id)}>&#128077;</button>
        <button className="btn btn-primary btn-sm reject-post" onClick={() => deleteFun(id)}>&#x1F44E;</button>
    </>
  )
}
