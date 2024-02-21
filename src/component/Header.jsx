import React from 'react'
import { FaHeadphones } from "react-icons/fa";
import FileUploadModel from './FileUploadModel';
const Header = () => {
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:"space-around" ,width:'100%'}}>
        <div>
          <h2 style={{fontFamily: "Dancing Script", fontSize:'50px'}}>
            HiTBiTs
          </h2>
        </div>
        <div className='search'>
            Search Song
        </div>
        <div>
        <FileUploadModel />
            {/* <button style={{padding:'10px',border:'0px',background:'#1c8adb',color:'white', borderRadius:'5px', fontFamily:'sans-serif', cursor:'pointer'}}>Upload Song</button> */}
        </div>
    </div>
  )
}

export default Header