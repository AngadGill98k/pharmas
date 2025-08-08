import React from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  let navigate = useNavigate()
  return (

    <div className='navbar'>
      <div id='call'>
        <p id='p_call'> Your first 5 minute are free</p>
        <button id='btn_call'>call now</button>
      </div>
      <div className='sec1'>
        <div><img style={{ width: '20px' }} src='/images/image.png' alt='phone' />+91 9826352321</div>
        <img src='/images/Amrutam.png' alt='logo' />
      </div>
      <div className='sec2'>
        <div style={{ display: "flex", alignContent: "center", justifyContent: "space-between" ,width:"60%"}}>
          <button onClick={() => { navigate('/home') }} className='opt'>Home</button>
          <button className='opt'>Find Doctors</button>
          <button className='opt'>Lab Tests</button>
          <button className='opt'>Shop</button>
          <button onClick={() => { navigate('/forums') }} className='opt'>Forum</button>
          <button className='opt'>About Us</button>
          <button style={{ background: 'none', border: 'none' }}> <img src='images/Frame 1171275528.png' alt='user' /></button>
          <button onClick={() => { navigate('/cart') }} style={{ background: 'none', border: 'none' }}><img src='images/Frame 1984077291.png' alt='user' /></button>
          <button style={{ background: 'none', border: 'none' }}> <img src='images/Frame 1171275527.png' alt='user' /></button>
          <button style={{ background: 'none', border: 'none' }}><img src='images/Frame 1171275530.png' alt='user' /> </button>
          
          <button className='opt2' onClick={() => { navigate('/admin') }}>Admin</button>
          <button className='opt2' onClick={() => { navigate('/user') }}>User</button>
        
        </div>

        {/* <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
        </div> */}
      </div>
    </div>

  )
}

export default Navbar