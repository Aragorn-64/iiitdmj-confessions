import React from 'react'

export const LogoutBtn = ({logoutFun}) => {
    
  return (
    <button className='btn btn-outline-dark' onClick={logoutFun}>Logout</button>
  )
}
