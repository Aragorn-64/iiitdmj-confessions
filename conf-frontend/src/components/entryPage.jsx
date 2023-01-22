import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import {ReactSession} from 'react-client-session'

export const EntryPage = ({checkAuth, pass, setPass}) => {
    // let url = "https://conf-api.onrender.com"
    
    let q = "Which hostel has A and B block?"
    return (
        <>
        <div className="page-title">
            IIITDMJ Confessions Page
        </div>
        <div className="preview">

        </div>
        <div className="login-area">
            <label htmlFor="pass">{q}</label>
            <input className='form-control' type="text" value={pass} onChange={(e) => {setPass(e.target.value)}} name="pass" id="pass" />
            <button className='login-btn btn btn-primary' onClick={() => {checkAuth()}}>Enter</button>
        </div>
        </>
    )
}
