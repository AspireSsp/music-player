import '../App.css';
import React from 'react'
import { LuShuffle } from "react-icons/lu";
import { RxLoop } from "react-icons/rx";
import { LuMusic4 } from "react-icons/lu";
import { FileState } from '../context/FileProvider';

const TrackList = () => {
  const { songs, setCurrentSong, setIsPlay } = FileState();
  console.log(songs);

  const handlePlaySong = async(selectedSong)=>{
    setCurrentSong(selectedSong);
    setIsPlay(true);
  }
  return (
    <div style={{padding:'10px'}}>
      <div style={{margin:'0px'}}>
        <h2>
          Track list
        </h2>
      </div>
      <div style={{margin:'0px'}}>
        <button style={{border:"0px", backgroundColor:'transparent', cursor:'pointer', margin:'0px'}}>
            <LuShuffle style={{fontSize:'20px', padding:'2px'}}  />
        </button>
        <button style={{border:"0px", backgroundColor:'transparent', cursor:'pointer'}}>
            <RxLoop style={{fontSize:'20px', padding:'2px'}}  />
        </button>
      </div>
      <div>
        <div>
          <h4>Playing next</h4>
        </div>
        <div>
            {
              songs?.map((song)=>(
                <div key={song.id} onClick={()=>{handlePlaySong(song)}} className='listhover'  style={{display:'flex', alignItems:'center',padding:'0px', margin:'1px',height:'60px', borderRadius:'6px', background:'#FAFAFA', cursor:'pointer'}}>
                    <div style={{width:'35px',display:'flex',justifyContent:'center', margin:'0px', paddingLeft:'4px'}} >
                      <img src='https://cdn.pixabay.com/photo/2015/12/09/22/09/music-1085655_640.png' style={{width:'100%'}} />
                    </div>
                    <div style={{display:'flex',height:'50px', flexDirection:'column',justifyContent:'center', width:'80%', margin:'0px',overflow: "hidden"}}>
                        <h4 style={{lineHeight:'0px',margin:'10px',}}>{song?.name.length>28 ? song.name.substring(0, 28)+".." : song?.name}</h4>
                        <p style={{lineHeight:'0px', margin:'10px'}}>{song.artist}</p>
                    </div>
                    <div style={{display:'flex', alignItems:'center', height:'50px'}}>
                      <p>{song.duration}</p>
                    </div>
                </div>
              ))
            }
         
        
        </div>
      </div>
    </div>
  )
}

export default TrackList