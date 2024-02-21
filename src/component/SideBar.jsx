import React from 'react'
import { GoGear } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
const SideBar = () => {
  return (
    <div style={{width:'100%'}}>
        <div style={{display:'flex', justifyContent: 'center', alignItems:'center', marginTop:'20px'}}>
            <div style={{height:"45px", width:'45px', }}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTZmD-q02jXwyaEEnzYecDuFQ8EoDR5BgyKpBqx7dlZMEY_bK3rojQsGshrg9Z3sZot38&usqp=CAU' alt='profile-image' style={{height:"100%", width:'100%', borderRadius:"50%"}} />
            </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center',  position:'absolute', bottom:'20px', left:'10px'}}>
           <div>
                <button style={{border:"0px", backgroundColor:'transparent', cursor:'pointer'}}>
                    <GoGear style={{fontSize:'30px', padding:"5px"}} />
                </button>
           </div>
           <div>
                <button style={{border:"0px", backgroundColor:'transparent', cursor:'pointer'}}>
                    <CiLogout style={{fontSize:'30px', padding:'5px'}}  />
                </button>
           </div>
        </div>
    </div>
  )
}

export default SideBar