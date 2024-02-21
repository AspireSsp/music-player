import React, { createContext, useContext, useEffect, useState } from "react";
import { LuShuffle } from "react-icons/lu";
import { RxLoop } from "react-icons/rx";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FileState } from "../context/FileProvider";
const LivePlayRange = () => {
    const { currentSong,setCurrentSong, songs, isPlay, setIsPlay, setPlayingAudio, playingAudio } = FileState();
    const [currentTime, setCurrentTime] = useState()
    const [playPersent, setPlayPersent] = useState(0);
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffle] = useState(false)
    console.log(loop);
    function calculatePercentagePlayed(currentTime, duration) {
        if (typeof currentTime === 'number' && typeof duration === 'number' && duration > 0) {
            const percentagePlayed = (currentTime / duration) * 100;
            return Math.round(percentagePlayed);
        } else {
            return 0;
        }
    }

    useEffect(() => {
        if(playingAudio){
            if(isPlay){
                playingAudio.play();
            }else{
                playingAudio.pause();
            }
        }
        const trackAudio = ()=>{
            if(isPlay && playingAudio){
                playingAudio.addEventListener('timeupdate', () => {
                    const currentTime = playingAudio.currentTime;
                    setCurrentTime(currentTime)
                    setPlayPersent(calculatePercentagePlayed(currentTime, playingAudio.duration))
                });
                
                playingAudio.addEventListener('ended', ()=>{
                    console.log('loop is active----->',loop);
                    if(loop){
                        playingAudio.play();
                        console.log('loop is active');
                    }else{
                        playingAudio.loop = false;
                        // playingAudio.pause()
                        handlePlayNext();
                    }
                });
            }
        }
        trackAudio()
    }, [isPlay, currentSong, loop])
    
    const handlePlay = ()=>{
        setIsPlay(!isPlay);
        playingAudio.play();
    }
    const handlePause = ()=>{
        setIsPlay(!isPlay);
        playingAudio.pause();
    }
    const formateTime = (duration)=>{
        if(!duration){
            return '0:00'
        }
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const handlePlayNext = ()=>{
        const index = songs.findIndex((song)=>{return song===currentSong});
        console.log(index);
        if(songs.length == index+1){
            // alert("this is the last song of your List")
            console.log("htis is the lsrst");
        }else{
            playingAudio.pause();
            setCurrentSong(songs[index+1]);
            const audio = new Audio();
            audio.src = URL.createObjectURL(songs[index+1].file);
            setPlayingAudio(audio);
        }
    }
    const handlePlayPrev = ()=>{
        const index = songs.findIndex((song)=>{return song===currentSong});
        console.log(index);
        if(index == 0){
            alert("this is the First song of your List")
        }else{
            playingAudio.pause();
            setCurrentSong(songs[index-1]);
            const audio = new Audio();
            audio.src = URL.createObjectURL(songs[index-1].file);
            setPlayingAudio(audio);
        }
    }
    const handleLoopPlay = ()=>{
        setLoop(!loop);
    }
    const handleShuffle = ()=>{
        setShuffle(!shuffle);
    }
    return (
        <div>
            <div style={{marginTop:'20px', display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
                <div style={{width:"100%"}}>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex', width:'90%', justifyContent: 'space-between', paddingLeft:'5px', paddingRight:'5px' }}>
                            <p>{formateTime(currentTime)}</p>
                            <p>{currentSong?.duration}</p>
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <input value={playPersent} style={{width:"90%"}}  type="range" id="vol" step="1" name="vol" min="0" max="100" />
                    </div>
                </div>
            </div>
            <div style={{display:'flex', alignItems:'center',justifyContent:'center',  marginTop:'20px', width:'100%'}}>
                <div style={{display:'flex',alignItems:'center', justifyContent:'space-between', width:'90%'}}>
                    <div>
                        <LuShuffle onClick={handleShuffle} style={{fontSize:'20px', padding:'2px', cursor:'pointer', color: shuffle?'blue':'black'}}  />
                    </div>
                    <div>
                        <TbPlayerTrackPrevFilled onClick={handlePlayPrev} style={{fontSize:'20px', padding:'2px', cursor:'pointer'}}/>
                    </div>
                    <div>
                    {
                        isPlay? 
                        <FaPause onClick={handlePause} style={{fontSize:'20px', padding:'2px', cursor:'pointer'}}/> :
                        <FaPlay onClick={handlePlay}  style={{fontSize:'20px', padding:'2px', cursor:'pointer'}}/>  
                    }
                    </div>
                    <div>
                        <TbPlayerTrackNextFilled onClick={handlePlayNext} style={{fontSize:'20px', padding:'2px', cursor:'pointer'}}/>
                    </div>
                    <div>
                        <RxLoop onClick={handleLoopPlay} style={{fontSize:'20px', padding:'2px', cursor:'pointer', color:loop?"blue":"black"}}  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LivePlayRange