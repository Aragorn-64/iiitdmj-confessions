import React from 'react'
import preview from '../preview.png'
export const EntryPage = ({checkAuth, pass, setPass}) => {
    // let url = "https://conf-api.onrender.com"
    let questions = ["Which hostel has A and B block?", "What is the L number of the Auditorium?"]
    
    let q = "Which hostel has A and B block?"
    return (
        <>
            <div className="entry-page vh-100">
                <div className="preview">
                    <img className='preview-img' src={preview}alt="preview" />
                </div>
                <div className="login-area">
                    <input placeholder={questions[Math.floor(Math.random() * 2)]} className='form-control pass-input' type="text" value={pass} onChange={(e) => {setPass(e.target.value)}} name="pass" id="pass" />
                    
                    <button className='login-btn btn btn-primary' onClick={() => {checkAuth()}}>Enter</button>
                </div>
            </div>
        </>
    )
}
