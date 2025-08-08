import React from 'react'
import './footer.css'
const Footer = () => {
  return (
    <>
        <div className='download'>
            <div className='details'>
               <h2 id='h2'>Download Amrutam Ayurveda App Now</h2> 
               <p id='p1' >The Amrutam Ayurveda App is your one-stop app for all things Ayurveda! Apart from mimicking the website, the app has added benefits</p>
            <div className='images'>
<img style={{width:'45%'}} src='/images/Screenshot 2025-08-02 142553.png'></img>
<img style={{width:'45%'}} src='/images/Screenshot 2025-08-02 142553.png'></img>
<img style={{width:'45%'}} src='/images/Screenshot 2025-08-02 142553.png'></img>
<img style={{width:'45%'}} src='/images/Screenshot 2025-08-02 142553.png'></img>
            </div>
            <img style={{width:'45%'}} src='/images/Screenshot 2025-08-02 142553.png'></img>

           <img style={{width:'45%'}} src='/images/Screenshot 2025-08-02 142553.png'></img>

            </div>
          <div className='right'>
            
           {/* <img  src='/images/right.png'></img> */}

          </div>
        </div>
       
        <div
  className="footer"
  style={{
    backgroundImage: "url('/images/17646339f71940f72e73b1a9d9e085a58808153f.png')",
    backgroundSize:"contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "300px",
    width:"100%"
  }}
></div>
    </>
  )
}

export default Footer