import React, { createContext, useContext, useEffect, useState } from "react";
import { FileState } from '../context/FileProvider';
import LivePlayRange from "./LivePlayRange";
import VolumeRange from "./VolumeRange";

  const Player = () => {
  const { currentSong } = FileState();
 
  if(!currentSong){
    return(
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'100%'}}>
        Firstly Upload music file using Upload button in hadder, then play songs
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
              <h4 style={{margin:'5px', fontSize:'25px' }}>{currentSong.name}</h4>
              <p style={{ margin:'5px', fontSize:'20px'}}>{currentSong.artist}</p>
          </div>
        </div>
      </div>
      <LivePlayRange />
      <VolumeRange />
    </div>
  )
}

export default Player;