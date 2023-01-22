import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Header } from './header';

export const EntryPage = ({checkAuth, pass, setPass}) => {
    // let url = "https://conf-api.onrender.com"
    let questions = ["Which hostel has A and B block?", "What is the L number of the Audi?"]
    
    let q = "Which hostel has A and B block?"
    return (
        <>
            <div className="entry-page">
                <div className="preview">
            
                </div>
                <div className="login-area">
                    <input placeholder={"Answer this : " + questions[Math.floor(Math.random() * 2)]} className='form-control' type="text" value={pass} onChange={(e) => {setPass(e.target.value)}} name="pass" id="pass" />
                    
                    <button className='login-btn btn btn-primary' onClick={() => {checkAuth()}}>Enter</button>
                </div>
            </div>
        </>
    )
}
