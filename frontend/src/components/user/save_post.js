import React, { useEffect, useState } from 'react'

const Save_post = () => {
    let [bookmarks, setBookmarks] = useState([]);
    let [faq, setFaq] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/get_bookmarks', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.msg) {
                    console.log(data);
                    setBookmarks(data.bookmarks);
                }
            })
            .catch(err => console.error(err));
    }, [])
    useEffect(() => {
        console.log(bookmarks);
    },[bookmarks])
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
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
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
                setBookmarks(data.post);
            })
            .catch(err => console.error(err));
    };
    return (
        <>
            <div style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: "20px", boxSizing: "border-box", borderRadius: "20px", flexWrap: "wrap", width: "70%" }}>
                <div style={{ display: "flex", alignContent: "center",borderBottom:"1px solid #3A643B",marginBottom:"20px" }}>
                    <h3 style={{ color: "#3A643B" }}>Saved Posts</h3>
                </div>


                <div>
                    {bookmarks && bookmarks.map((bookmark, index) => {
                        return (
                            <>
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div style={{ display: "flex", alignContent: "center" }}>
                                                <img src=''></img>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <p style={{ margin: "0px" }}>Anonymous</p>
                                                <p style={{ margin: "0px" }}> time</p>
                                            </div>
                                        </div>

                                        <button style={{ border: "none", borderRadius: "10px", fontWeight: "bold" }}>:</button>
                                    </div>

                                    <div >
                                        <h4 style={{ margin: "0px" }}>Question: {bookmark.question}</h4>
                                        <p style={{ margin: "0px" }}>{bookmark.description} edsc</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p style={{ margin: "0px" }}>Replies  {bookmark.replies.length} reply</p>
                                        <button style={{ border: "none", borderRadius: "10px", background: "none", color: "#3A643B", fontWeight: "bold" }}>View all Reply</button>
                                    </div>

                                    <div style={{ padding: "10px", borderRadius: "10px", display: "flex", justifyContent: "end", width: "100%" }} >
                                        <div style={{ backgroundColor: "#3A643B1A", borderRadius: "10px", padding: "10px", marginRight: "10px", width: "80%" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div style={{ display: "flex", alignContent: "center" }}>
                                                        <img src=''></img>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <p style={{ margin: "0px" }}>Anonymous</p>
                                                        <p style={{ margin: "0px" }}> time</p>
                                                    </div>
                                                </div>
                                                <button style={{ border: "none", borderRadius: "10px", fontWeight: "bold" }}>:</button>

                                            </div>
                                            <div >
                                                <h4 style={{ margin: "0px" }}>Question: {bookmark.question}</h4>
                                                <p style={{ margin: "0px" }}>{bookmark.description} edsc</p>
                                            </div>
                                            {/* <p>{bookmark.replies.answer}</p>
                                            <p>{bookmark.replies.likes}</p> */}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

                                        <button onClick={() => handlelike(bookmark)}>{bookmark.like.length} Like</button>
                                        <button onClick={() => handlereply(bookmark)}> Reply</button>
                                        <button onClick={() => handlebookmark(bookmark)}>{bookmark.bookmarked} Bookmark</button>
                                    </div>

                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Save_post