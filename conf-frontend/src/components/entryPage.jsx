import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import {ReactSession} from 'react-client-session'

export const EntryPage = () => {
    let [pass, setPass] = useState("")
    let checkAuth = () => {
        axios.post('https://conf-api.onrender.com/api/auth', {
            pass: pass
        })
        .then((res) => {
            ReactSession.set("authType", res.data);
            console.log("res.data :", res.data);
        })
        .catch((err) => console.log(err))
    }
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
            <button className='login-btn btn btn-primary' onClick={checkAuth}>Enter</button>
        </div>
        </>
    )
}
