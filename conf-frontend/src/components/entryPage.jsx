import React, { useState,useEffect } from 'react'
import preview from '../preview.png'
import {Post} from './post'

export const EntryPage = ({checkAuth, previews ,pass, setPass}) => {
    let [qno, setQno] = useState(0)
    // let url = "https://conf-api.onrender.com"

    let questions = ["Which hostel has A and B block?", "What is the L number of the Auditorium?"]
    // console.log("previews: " + previews)
    // let q = "Which hostel has A and B block?"

    let allPreviews = previews.map(prev => {
        return <Post post={prev} key={prev._id}/>
    })
    return (
        <>
            <div className="entry-page col">
                <div className="preview row">
                    {allPreviews}
                </div>
                <div className="login-area row">
                    <h4>Entry Question</h4>
                    <div className="input-container">
                    <div class="input-hidden-label" aria-hidden="true">
                        {questions[qno]}
                    </div>
                    <input placeholder={questions[qno]} className='form-control pass-input' type="text" value={pass} onChange={(e) => {setPass(e.target.value)}} name="pass" id="pass" />
                    </div>
                    <div className="btn-toolbar login-btns col">
                        {/* <div className="btn-group">
                            <button className='login-btn btn btn-primary' onClick={() => {checkAuth()}}>Enter</button>
                        </div>
                        <div className="btn-group">
                            <button className='btn btn-info'>refresh</button>
                        </div> */}
                        <button className='login-btn btn btn-primary' onClick={() => {checkAuth()}}>Enter</button>
                        <button className='btn btn-info' onClick={() => setQno((qno+1)%2)}>&#8635;</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
