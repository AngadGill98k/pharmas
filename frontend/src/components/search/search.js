import React, { useRef } from 'react'
import "./search.css"

const Search = () => {
    let input=useRef(null);
  function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
    let hnadleclick = () => {
            // let product=input.current.value;
            // console.log(product);
            // fetch('', {
            //   method: 'GET',
            //   credentials: 'include',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'X-CSRF-Token': getCookie('XSRF-TOKEN')
            //   }
            // })
            // .then(res => res.json())
            // .then(data => {
            //   console.log(data);
            // })
            // .catch(err => console.error(err));
    }
  return (
  <div  className='search_container'>
  <h1>Store</h1>
  <div className='searchbar'>
  <input id='search' type="text" ref={input} placeholder="Search for products" />
  <button id='search_btn' onClick={hnadleclick()}>Search</button>
  </div>
  </div>
  )
}

export default Search