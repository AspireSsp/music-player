import React, { useState } from 'react';
import { FileState } from '../context/FileProvider';
import { storeFileInIndexedDB } from '../utils/indexedDB';

const Modal = ({ isOpen, onClose, children }) => {
    const modalStyle = {
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        zIndex: '999',
        width: '450px',
        height: '200px'
    };
    return (
        <div className='model' style={modalStyle}>
        <span
            style={{
            fontSize:'40px',  
            position: 'absolute',
            top: '10px',
            right: '15px',
            cursor: 'pointer',
            }}
            onClick={onClose}
        >
            &times;
        </span>
        {children}
        </div>
    );
};

const FileUploadModel = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [audioFile, setAudioFile] = useState();
    const {songs, setSongs } = FileState();
    
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleAddSong = async () => {     
        const audioUrl = URL.createObjectURL(audioFile);
        const audio = new Audio();
        audio.src = audioUrl;
      
        const durationPromise = new Promise((resolve) => {
          audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
          });
        });
        const duration = await durationPromise;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const mySong = {
            id: Date.now(),  
            name: audioFile.name,
            artist: "unknown",
            file: audioFile,
            duration: formattedDuration,
            isPlay: false,
        };
        setSongs([...songs, mySong]);
        storeFileInIndexedDB(mySong);
        closeModal();
    };
      
    return ( 
        <div>
            <button onClick={openModal} style={{padding:'0.7rem',border:'0px',background:'#1c8adb',color:'white', borderRadius:'5px', fontFamily:'sans-serif', cursor:'pointer', fontWeight:'700', fontSize:'1rem'}}>Upload</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Upload your audio file here...!</h2>
                <input placeholder='select file' type='file' onChange={(e)=>{setAudioFile(e.target.files[0])}} />
                <div style={{marginTop:'50px'}}>
                    <div style={{position:'absolute', right:'10px'}}>
                        <button onClick={closeModal} style={{padding:'10px',border:'1px solid gray',background:'transparent',color:'black', borderRadius:'5px', fontFamily:'sans-serif', cursor:'pointer', margin:'4px', fontWeight:'700', fontSize:'1rem'}}>Cancel</button>
                        <button onClick={handleAddSong} style={{padding:'10px',border:'0px',background:'#1c8adb',color:'white', borderRadius:'5px', fontFamily:'sans-serif', cursor:'pointer', margin:'4px', fontWeight:'700', fontSize:'1rem'}}>Add Song</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FileUploadModel;
