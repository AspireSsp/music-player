import React, { createContext, useContext, useEffect, useState } from "react";

const FileContext = createContext();

const FileProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState();
    const [songs, setSongs] = useState(JSON.parse(localStorage.getItem('audioList')) || []);
    const [topSongs, setTopSongs] = useState([]);
    const [duration, setduration] = useState();
    const [playTime, setPlayTime] = useState();
    const [isPlay, setIsPlay] = useState(false);
    const [playingAudio, setPlayingAudio] = useState();
    const [volume, setVolume] = useState(0.5);

    const objectStoreName = 'audioFiles';  
    const dbName = "hitbits";
    const getAllFilesFromIndexedDB = (callback) => {
    const request = indexedDB.open(dbName, 1);
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([objectStoreName], 'readonly');
      const objectStore = transaction.objectStore(objectStoreName);
  
      const files = [];
  
      objectStore.openCursor().onsuccess = (cursorEvent) => {
        const cursor = cursorEvent.target.result;
        if (cursor) {
          files.push(cursor.value);
          cursor.continue();
        } else {
          // All files have been retrieved
          callback(files);
        }
      };
  
      transaction.oncomplete = () => {
        db.close();
      };
    };
  
    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      callback([]);
    };
};
  
useEffect(() => {
    getAllFilesFromIndexedDB((files) => {
        setSongs(files);
        if(files.length){
            setCurrentSong(files[0]);
            const audio = new Audio();
            audio.src = URL.createObjectURL(files[0].file);
            setPlayingAudio(audio);
        }
    });
  }, []);

  return (
    <FileContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        songs,
        setSongs,
        topSongs,
        setTopSongs,
        isPlay,
        setIsPlay,
        playingAudio,
        setPlayingAudio,
        volume,
        setVolume,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const FileState = () => {
  return useContext(FileContext);
};

export default FileProvider;