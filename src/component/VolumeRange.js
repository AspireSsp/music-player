import React, { useEffect } from "react";
import { IoMdVolumeLow } from "react-icons/io";
import { IoMdVolumeHigh } from "react-icons/io";
import { FileState } from "../context/FileProvider";
const VolumeRange = () => {
    const { volume, setVolume, currentSong, playingAudio,} = FileState();
    const handleVolumeChange = (newVolume) => {
        if (playingAudio) {
            const clampedVolume = Math.max(0.0, Math.min(1.0, newVolume));
            playingAudio.volume = clampedVolume;
            setVolume(clampedVolume);
        }
    };
    useEffect(() => {
        playingAudio.volume = volume;
    }, [currentSong])
    
    return (
        <div>
            <div style={{display:'flex', alignItems:'center',justifyContent:'center',  marginTop:'40px',width:'100%'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', width:'80%'}} >
                    <IoMdVolumeLow style={{fontSize:'20px', padding:'2px', cursor:'pointer'}} />
                    <input
                        style={{ width: "100%", height: "3px", cursor:'pointer' }}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    />
                    <IoMdVolumeHigh style={{fontSize:'20px', padding:'2px', cursor:'pointer'}} />
                </div>
            </div>
        </div>
    )
}

export default VolumeRange