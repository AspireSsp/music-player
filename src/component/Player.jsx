import React, { createContext, useContext, useEffect, useState } from "react";
import { LuShuffle } from "react-icons/lu";
import { RxLoop } from "react-icons/rx";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { IoMdVolumeLow } from "react-icons/io";
import { IoMdVolumeHigh } from "react-icons/io";
import { FileState } from '../context/FileProvider';

  const Player = () => {
  const { currentSong, isPlay, setIsPlay } = FileState();
  console.log(currentSong?.file);
  useEffect(() => {
    const playSong = async()=>{
      console.log("my cuurr-->",currentSong);
      if(currentSong){
        console.log("my if-->",currentSong);
        const audio = new Audio();
        if(isPlay){
          audio.src = URL.createObjectURL(currentSong.file);
          audio.play();
        }else{
          audio.src = URL.createObjectURL(currentSong.file);
          audio.pause();
        }
      }
    }
    playSong();  
  }, [isPlay, currentSong])
  

  if(!currentSong){
    return(
      <div>
        Loading songs...
      </div>
    )
  }
  

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center'}}>
        <h2>Now Playing</h2>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
        <div style={{width:'400px'}}>
          <img style={{width:'100%', borderRadius:'12px'}} src='https://media.istockphoto.com/id/179256937/photo/musical-background-in-red-toned.jpg?s=612x612&w=0&k=20&c=MgqOmEN40HPgQeKuh68noJ9VodKH963zV70WvMBlhI0=' alt='image' />
          <div style={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
              <h4 style={{lineHeight:'4px',margin:'10px', fontSize:'25px' }}>{currentSong.name}</h4>
              <p style={{lineHeight:'4px', margin:'10px', fontSize:'20px'}}>{currentSong.artist}</p>
          </div>
        </div>
      </div>
      <div style={{marginTop:'20px', display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
          <div style={{width:"550px"}}>
            <div style={{display:'flex', width:'100%', justifyContent: 'space-between', paddingLeft:'5px', paddingRight:'5px' }}>
              <p>2:30</p>
              <p>2:02</p>
            </div>
            <input style={{width:"100%"}}  type="range" id="vol" name="vol" min="0" max="50" />
          </div>
      </div>
      <div style={{display:'flex', alignItems:'center',justifyContent:'center',  marginTop:'20px', width:'100%'}}>
        <div style={{display:'flex',alignItems:'center', justifyContent:'space-between', width:'450px'}}>
          <div>
            <LuShuffle style={{fontSize:'20px', padding:'2px'}}  />
          </div>
          <div>
            <TbPlayerTrackPrevFilled style={{fontSize:'20px', padding:'2px'}}/>
          </div>
          <div>
          {
            isPlay? 
            <FaPause onClick={()=>{setIsPlay(!isPlay)}} style={{fontSize:'20px', padding:'2px'}}/> :
            <FaPlay onClick={()=>{setIsPlay(!isPlay)}}  style={{fontSize:'20px', padding:'2px'}}/>  
          }
          </div>
          <div>
            <TbPlayerTrackNextFilled style={{fontSize:'20px', padding:'2px'}}/>
          </div>
          <div>
            <RxLoop style={{fontSize:'20px', padding:'2px'}}  />
          </div>
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center',justifyContent:'center',  marginTop:'40px',width:'100%'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', width:'450px'}} >
          <IoMdVolumeLow style={{fontSize:'20px', padding:'2px', cursor:'pointer'}} />
          <input style={{ width: "100%", height: "3px", cursor:'pointer' }} type="range" id="vol" name="vol" min="0" max="50" />
          <IoMdVolumeHigh style={{fontSize:'20px', padding:'2px', cursor:'pointer'}} />
        </div>
      </div>
    </div>
  )
}

export default Player;