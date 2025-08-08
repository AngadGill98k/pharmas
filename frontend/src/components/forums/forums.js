import React, { use, useEffect, useState } from 'react'
import Navbar from '../nav/Navbar'
import Add from './add'
import './forums.css'




const Forums = () => {
  let [faq, setFaq] = useState([])
  let [toggle, setToggle] = useState(false)
  let [filter, setFilter] = useState('Most Liked')
  let [toggle_sort, setToggle_sort] = useState(false)
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
  const fetchFaq = () => {
    fetch('http://localhost:3001/get_faq', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Updated FAQ:', data);
        setFaq(data.post);
      })
      .catch(err => console.error(err));
  };
  const Sort = ({ setFilter, setToggle_sort }) => {
    const sort = ['Recent', 'Most Liked', 'Most Commented', 'Oldest'];

    return (
      <div className="sort-dropdown" role="menu">
        <ul className="sort-list" style={{ listStyle: 'none', margin: 0, padding: 8 }}>
          {sort.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setFilter(item);
                  setToggle_sort(false); // close dropdown after selection
                }}
                className="sort-item"
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  userSelect: 'none',
                  marginBottom: index === sort.length - 1 ? 0 : 6
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    const sortedFaq = [...faq];

    switch ((filter || '').toLowerCase()) {
      case 'recent':
        sortedFaq.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
        setFaq(sortedFaq);
        console.log("recent", sortedFaq);
        break;

      case 'oldest':
        sortedFaq.sort((a, b) => new Date(a.date) - new Date(b.date)); // Oldest first
        setFaq(sortedFaq);
        console.log("oldest", sortedFaq);
        break;

      case 'most liked':
        sortedFaq.sort((a, b) => b.like.length - a.like.length);
        setFaq(sortedFaq);
        console.log("most liked", sortedFaq);
        break;

      case 'most commented':
        // sortedFaq.sort((a, b) => b.comments.length - a.comments.length); // Assuming you have comments array
        // setFaq(sortedFaq);
        // console.log("most commented", sortedFaq);
        break;

      default:
        // Do nothing, keep server order
        break;
    }
  }, [filter]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  let handlebookmark = (question) => {
    console.log(question);
    let id = question._id;
    fetch('http://localhost:3001/bookmark', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCookie('XSRF-TOKEN')
      },
      body: JSON.stringify({
        id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          fetchFaq();
        }
      })
      .catch(err => console.error(err));
  }
  let handlelike = (question) => {
    console.log(question);
    let id = question._id;
    fetch('http://localhost:3001/like', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCookie('XSRF-TOKEN')
      },
      body: JSON.stringify({
        id
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg) {

          fetchFaq();
        }
      })
  }
  let handlereply = (question) => {
    console.log(question);
    let id = question._id;
    fetch('http://localhost:3001/reply', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCookie('XSRF-TOKEN')
      },
      body: JSON.stringify({
        id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          fetchFaq();
        }
      })
  }

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
              <input style={{ height: "40px", flex:1, borderRadius: "10px", border: "1px solid #e6e6e6", paddingLeft: "10px" }} type='text' placeholder='search here'></input>
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  onClick={() => setToggle_sort(!toggle_sort)}
                  style={{
                    height: "40px",
                    width: "80px",
                    borderRadius: "10px",
                    border: "1px solid black",
                    paddingLeft: "10px",
                    background:"none",
                    border:"none"
                  }}
                >
                  <img style={{height:"100%",width:"100%"}} src='./images/sort.png'></img>
                </button>

                {toggle_sort && (
                  <Sort setFilter={setFilter} setToggle_sort={setToggle_sort} />
                )}
              </div>
            </div>
            {toggle_sort && <Sort setFilter={setFilter} setToggle_sort={setToggle_sort} />}

            <div className='profile'>
              <div className='name'>
                <img style={{}} src='./images/admin_logo.png'></img>
                <span>Profile</span>
              </div>
              <button style={{ borderRadius: "10px", border: "none", paddingLeft: "10px", height: "40px", }} className='add_ques' onClick={handleadd}>Ask a question</button>
            </div>
            {toggle && (
              <div className="modal_backdrop">
                <div className="modal_content">
                  <button className="close_btn" onClick={() => setToggle(false)}>✖</button>
                  <Add toggle={toggle} setToggle={setToggle} fetchFaq={fetchFaq} />
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


          <div className='faq_list'>
            {faq && faq.map((question, index) => {
              return (
                <div style={{ borderBottom: "1px solid #e6e6e6", marginBottom: "2%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5%" }}>

                    <div style={{ justifyContent: "space-between", display: "flex", width: "19%", gap: "10px" }}>
                      <div style={{ display: "flex", alignContent: "center" }}>
                        <img style={{}} src='./images/admin_logo.png'></img>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p style={{ margin: "0px" }}>Anonymous</p>
                        <p style={{ margin: "0px", color: "#8D8D8D", fontFamily: "Dm Sans" }}> {faq[index].date}</p>
                      </div>
                    </div>

                    <button style={{ border: "none", borderRadius: "10px", fontWeight: "bold", background: "none" }}>:</button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px", paddingLeft: "10px" }} >
                    <h4 style={{ margin: "0px", fontFamily: "Dm Sans", color: "#000000" }}>Question: {question.question}</h4>
                    <p style={{ margin: "0px", fontFamily: "Dm Sans", color: "#1F1F1F" }}>{question.description} edsc</p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "20px", marginTop: "10px" }}>
                    <p style={{ margin: "0px", fontFamily: "Dm Sans", color: "#8D8D8D" }}>Replies  {question.replies.length} reply</p>
                    <button style={{ border: "none", borderRadius: "10px", background: "none", color: "#3A643B", fontWeight: "bold" }}>View all Reply</button>
                  </div>

                  {faq.replies ?(<div style={{ padding: "10px", borderRadius: "10px", display: "flex", justifyContent: "end", width: "100%" }} >
                    <div style={{ backgroundColor: "#3A643B1A", borderRadius: "10px", padding: "10px", marginRight: "10px", width: "80%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>

                        <div style={{ justifyContent: "space-between", display: "flex", width: "19%", gap: "10px" }}>
                          <div style={{ display: "flex", alignContent: "center" }}>
                            <img style={{}} src='./images/admin_logo.png'></img>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p style={{ margin: "0px" }}>Anonymous</p>
                            <p style={{ margin: "0px", color: "#8D8D8D", fontFamily: "Dm Sans" }}> {faq[index].date}</p>
                          </div>
                        </div>
                        <button style={{ border: "none", borderRadius: "10px", fontWeight: "bold" }}>:</button>

                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }} >
                        <h4 style={{ margin: "0px", fontFamily: "Dm Sans" }}>Question: {question.question}</h4>
                        <p style={{ margin: "0px" }}>{question.description} edsc</p>
                      </div>
                      <div style={{ display: "flex", gap: "20px", marginTop: "5%" }}>

                        <button style={{ background: "none", border: "none", display: "flex", alignItems: "center" }} onClick={() => handlelike(question)}>{question.like.length}<img src='./images/like.png'></img> </button>
                        <button style={{ background: "none", border: "none", display: "flex", alignItems: "center" }} onClick={() => handlereply(question)}> <img src='./images/comment.png'></img></button>
                      </div>
                    </div>
                  </div>):(
                    <>
                    <div style={{ padding: "10px", borderRadius: "10px", display: "flex", justifyContent: "end" }} >
                    <div style={{ backgroundColor: "#3A643B1A", borderRadius: "10px", padding: "10px", marginRight: "10px"}}>
              
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", }} >
                        <h4 style={{ margin: "0px", fontFamily: "Dm Sans" }}>No Replies yet</h4>
                        
                      </div>
                      
                    </div>
                  </div>
                    </>
                  )}
                  <div style={{ display: "flex", justifyContent: "center", gap: "80px", marginBottom: "10%", borderTop: "1px solid #e6e6e6", paddingTop: "20px" }}>

                    <button style={{ background: "none", border: "none", display: "flex", alignItems: "center" }} onClick={() => handlelike(question)}>{question.like.length}<img src='./images/like.png'></img> </button>
                    <button style={{ background: "none", border: "none", display: "flex", alignItems: "center" }} onClick={() => handlereply(question)}> <img src='./images/comment.png'></img></button>
                    <button style={{ background: "none", border: "none", display: "flex", alignItems: "center" }} onClick={() => handlebookmark(question)}>{question.bookmarked} <img src='./images/save.png'></img></button>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Forums