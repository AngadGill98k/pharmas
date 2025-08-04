import React, { useEffect, useState } from 'react'
import Navbar from '../nav/Navbar'
import Add from './add'
import './forums.css'

const Forums = () => {
    let [faq, setFaq] = useState([])
    let [toggle, setToggle] = useState(false)
    let handleadd = () => {
        setToggle(!toggle)
    }
    useEffect(() => {
        fetch('http://localhost:3001/get_faq', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setFaq(data.post);
            })
            .catch(err => console.error(err));
    }, [])
    return (
        <>
            <Navbar />

            <img style={{ width: '100%', }} src='/images/faqs_b.png'></img>

            <div className='faq_con'>
                   <div className='temp'> 
                <div className='wrapper'>
                    <div className='head'>
                        <button className='active'>Questions</button>
                        <button className='active'>Thoughts</button>
                    </div>
                    <div className='faq_search'>
                    <input type='text' placeholder='search here'></input>
                        <button>sort</button>
                    </div>
                    <div className='profile'>
                        <div className='name'>Profile</div>
                        <button className='add_ques' onClick={handleadd}>Ask a question</button>
                    </div>
                    {toggle && (
  <div className="modal_backdrop">
    <div className="modal_content">
      <button className="close_btn" onClick={() => setToggle(false)}>✖</button>
      <Add toggle={toggle} setToggle={setToggle} />
    </div>
  </div>
)}

                    {/* {faq && faq.map((faq, index) => {
                        return (
                            <div>
                                <p>profile</p>
                                <p>quesyion:...</p>
                                <p> replies..</p>
                            </div>
                        )
                    })} */}
                </div>


                <div className='faq'>
                    {faq && faq.map((question, index) => {
                        return (
                            <>
                                <div>
                                    <img></img>
                                    <p>{question.name}</p>
                                    <p>{question.time}</p>
                                    <p>{question.question}</p>
                                    <p>{question.description}</p>
                                    <p>Replies  {question.replies.length} reply</p>
                                    <button>View all Reply</button>
                                    <div>
                                        <img></img>
                                        <p>{question.replies.name}</p>
                                        <p>{question.replies.time}</p>
                                        <p>{question.replies.answer}</p>
                                        <p>{question.replies.likes}</p>
                                    </div>
                                    <p>{question.likes}</p>
                                    <p>{question.replies.length} Reply</p>
                                    <p>bookmark{question.bookmark}</p>

                                </div>
                            </>
                        )
                    })}
                </div>
                    </div>
            </div>
        </>
    )
}

export default Forums