import React from 'react'

export const CensorControl = ({id, updateFun, deleteFun}) => {
  return (
    <>  
        <button className="btn btn-primary btn-sm accept-post" onClick={(id) => updateFun(id)}>&#128077;</button>
        <button className="btn btn-primary btn-sm reject-post" onClick={(id) => deleteFun(id)}>&#x1F44E;</button>
    </>
  )
}
