import React, { createContext, useContext, useEffect, useState } from "react";
import { FileState } from '../context/FileProvider';
import LivePlayRange from "./LivePlayRange";
import VolumeRange from "./VolumeRange";
import FileUploadModel from "./FileUploadModel";

  const Player = () => {
  const { currentSong } = FileState();
 
  if(!currentSong){
    return(
      <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center',height:'100%'}}>
        <p>
          Firstly Upload music file using Upload button in hadder, then play songs
        </p> 
        <FileUploadModel />
      </div>
    )
  }
  
  return (
    <div>
      <div style={{display:'flex', justifyContent:'center'}}>
        <h2>Now Playing</h2>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
        <div className="play-image" style={{width:'400px'}}>
          <img style={{width:'100%', borderRadius:'12px'}} src='https://media.istockphoto.com/id/179256937/photo/musical-background-in-red-toned.jpg?s=612x612&w=0&k=20&c=MgqOmEN40HPgQeKuh68noJ9VodKH963zV70WvMBlhI0=' alt='image' />
          <div style={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center', width:'100%'}}>
              <h4 style={{margin:'5px', fontSize:'1.2rem', overflow:'auto', width:'90%', display:'flex', justifyContent:'center' }}>{currentSong.name}</h4>
              <p style={{ margin:'5px', fontSize:'1rempx'}}>{currentSong.artist}</p>
          </div>
        </div>
      </div>
      <LivePlayRange />
      <VolumeRange />
    </div>
  )
}

export default Player;