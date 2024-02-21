const dbName = 'fileDB';
const objectStoreName = 'files';

// Function to store a file in IndexedDB
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




// Function to retrieve a file from IndexedDB
const retrieveFileFromIndexedDB = (fileName, callback) => {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction([objectStoreName], 'readonly');
    const objectStore = transaction.objectStore(objectStoreName);

    const request = objectStore.get(fileName);

    request.onsuccess = (event) => {
      const file = event.target.result;
      if (file) {
        console.log('File retrieved from IndexedDB:', file);
        callback(file);
      } else {
        console.error('File not found in IndexedDB');
        callback(null);
      }
    };

    request.onerror = (event) => {
      console.error('Error retrieving file from IndexedDB:', event.target.error);
      callback(null);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  };

  request.onerror = (event) => {
    console.error('IndexedDB error:', event.target.error);
    callback(null);
  };
};

// Example usage:
const fileToStore = {
  name: 'example.txt',
  content: 'This is the content of the file.',
};

storeFileInIndexedDB(fileToStore);

// Later, to retrieve the file
retrieveFileFromIndexedDB('example.txt', (retrievedFile) => {
  if (retrievedFile) {
    // Do something with the retrieved file
    console.log('Retrieved File Content:', retrievedFile.content);
  }
});


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
  
// Example usage:
getAllFilesFromIndexedDB((files) => {
    console.log('All files from IndexedDB:', files);
    // Do something with the array of files
});
  
