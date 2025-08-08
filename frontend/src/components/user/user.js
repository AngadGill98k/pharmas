import React, { useState } from 'react'
import Navbar from '../nav/Navbar'
import Save_post from './save_post'

const User = () => {
    let [component,setComponent]=useState(false)
    let options=["dashboard","Appointments","My Wallet","My chats","My Orders","Saved Posts"]
    let handleoptions=(opt)=>{
        console.log(opt)
        if(opt==="Saved Posts"){
            setComponent(<Save_post/>)
            return
        }   





        setComponent(false)
        return
    }
    
    return (
    <>
    <Navbar/>
    <div style={{height:"15vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundImage:"url(images/User_b.png)",backgroundSize: "cover",backgroundPosition: "center",backgroundRepeat: "no-repeat", }}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <h1 style={{marginBottom:"0px"}}>Hello</h1>
            <h4 style={{margin:"0px",fontWeight:"normal",color:"#3A643B"}}>How are you feeling today?</h4>
        </div>
    </div>
    <div style={{display:"flex",justifyContent:"center",height:"68vh",backgroundColor:"white"}}>
        <div style={{width:"70%",boxSizing:"border-box",padding:"20px",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

            <div style={{boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",padding:"20px",boxSizing:"border-box",borderRadius:"20px",flexWrap:"wrap",width:"20%",height:"100%"}}>
                <div style={{height:"35%",boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <div style={{height:"80%",width:"80%",boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <div>
                            <img style={{}} src='./images/admin_logo.png'></img>
                            </div>
                            <p>Name</p>

                    </div>
                </div>


                <div style={{display:"flex",flexDirection:"column",height:"65%",boxSizing:"border-box"}} >
                    {options.map((opt,index)=>{
                        return(
                            <>
                                <button style={{borderTop:"1px solid #3A643B",height:"20%",width:"100%",background:"none",border:"none"}} onClick={()=>{handleoptions(opt)}}>{opt}</button>
                            </>
                        )
                    })}
                </div>
            </div>


            {component}

        </div>
    </div>
    </>
  )
}

export default User