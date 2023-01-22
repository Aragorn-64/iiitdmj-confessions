import React from 'react'

export const LogoutBtn = ({logoutFun}) => {
    
  return (
    <button className='btn btn-outline-dark logout-btn' onClick={logoutFun}>Logout</button>
  )
}
