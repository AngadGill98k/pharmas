import React from 'react'
import "./navbar.css"
const Navbar = () => {
  return (

    <div className='navbar'>
        <div id='call'>
            <p id='p_call'> Your first 5 minute are free</p>
            <button id='btn_call'>call now</button>
        </div>
        <div className='sec1'>
       <div><img style={{width:'20px'}} src='/images/image.png' alt='phone'/>+91 9826352321</div>
        <img src='/images/Amrutam.png' alt='logo' />
        </div>
        <div className='sec2'>
          <div>
          <button className='opt'>Home</button>
          <button className='opt'>Find Doctors</button>
          <button className='opt'>Lab Tests</button>
          <button className='opt'>Shop</button>
          <button className='opt'>Forum</button>
           <button className='opt'>About Us</button>
          </div>
          <div>
           
          <button style={{background:'none',border:'none'}}> <img src='images/Frame 1171275528.png' alt='user' /></button>
          <button style={{background:'none',border:'none'}}><img src='images/Frame 1984077291.png' alt='user' /></button>
          <button style={{background:'none',border:'none'}}> <img src='images/Frame 1171275527.png' alt='user' /></button>
          <button style={{background:'none',border:'none'}}><img src='images/Frame 1171275530.png' alt='user' /> </button>
          <button>down</button>
          </div>
        </div>
    </div>
   
  )
}

export default Navbar