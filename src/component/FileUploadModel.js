import React, { useState } from 'react';
import { FileState } from '../context/FileProvider';
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
    <div style={modalStyle}>
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
    const objectStoreName = 'audioFiles';  
    const dbName = "hitbits"
    const storeFileInIndexedDB = (file) => {
        const request = indexedDB.open(dbName, 1);
      
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(objectStoreName)) {
            db.createObjectStore(objectStoreName, { keyPath: 'name' });
          }
        };
        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction([objectStoreName], 'readwrite');
          const objectStore = transaction.objectStore(objectStoreName);
      
          const request = objectStore.add(file);
      
          request.onsuccess = () => {
            console.log('File added to IndexedDB');
          };
      
          request.onerror = (event) => {
            console.error('Error adding file to IndexedDB:', event.target.error);
          };
      
          transaction.oncomplete = () => {
            db.close();
          };
        };
      
        request.onerror = (event) => {
          console.error('IndexedDB error:', event.target.error);
        };
      };

    const handleAddSong = async () => {     
        const audioUrl = URL.createObjectURL(audioFile);
        const audio = new Audio();
      
        const durationPromise = new Promise((resolve) => {
          audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
          });
        });
       
        audio.src = audioUrl;
        // await audio.play(); 
        const duration = await durationPromise;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const mySong = {
          id: Date.now(),  
          name: audioFile.name,
          artist: "aknown",
          file: audioFile,
          duration: formattedDuration,
          isPlay: false,
        };
        console.log("song--->", songs);
        setSongs([...songs, mySong]);
        storeFileInIndexedDB(mySong);
        closeModal();
    };
      
    //   const handleFile = async(e)=>{
    //     const files =  e.target.files[0];
    //     const audioUrl = URL.createObjectURL(files);
    //     const audio = new Audio(audioUrl);
    //     audio.play();
    //     console.log(audioUrl);
    //   }

  return (
    <div>
      <button onClick={openModal} style={{padding:'10px',border:'0px',background:'#1c8adb',color:'white', borderRadius:'5px', fontFamily:'sans-serif', cursor:'pointer'}}>Upload</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Upload your audio file here...!</h2>
        <input placeholder='select file' type='file' onChange={(e)=>{setAudioFile(e.target.files[0])}} />
        <div style={{marginTop:'50px'}}>
            <div style={{position:'absolute', right:'10px'}}>
                <button onClick={closeModal} style={{padding:'10px',border:'1px solid gray',background:'transparent',color:'black', borderRadius:'5px', fontFamily:'sans-serif', cursor:'pointer', margin:'4px'}}>Cencle</button>
                <button onClick={handleAddSong} style={{padding:'10px',border:'0px',background:'#1c8adb',color:'white', borderRadius:'5px', fontFamily:'sans-serif', cursor:'pointer', margin:'4px'}}>Add Song</button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileUploadModel;
