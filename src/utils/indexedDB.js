
const dbName = 'hitbits';
const objectStoreName = 'audioFiles';
const version = 1;

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(objectStoreName)) {
                db.createObjectStore(objectStoreName, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const storeFileInIndexedDB = async (file) => {
    try {
        const db = await openDatabase();
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
    } catch (error) {
        console.error('IndexedDB error:', error);
    }
};




// Function to retrieve a file from IndexedDB
export const retrieveFileFromIndexedDB = (fileName, callback) => {
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


export const getAllFilesFromIndexedDB = (callback) => {
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
    // console.log('All files from IndexedDB:', files);
    // Do something with the array of files
});
  

// export function updateFileInDB(dbName, objectStoreName, fileId, updatedData, successCallback, errorCallback) {
//     const request = indexedDB.open(dbName, version);

//     request.onsuccess = function (event) {
//         const db = event.target.result;

//         const transaction = db.transaction([objectStoreName], 'readwrite');
//         const objectStore = transaction.objectStore(objectStoreName);

//         const getRequest = objectStore.get(fileId);

//         getRequest.onsuccess = function (event) {
//             const fileRecord = event.target.result;

//             // Update the file data with the new information
//             // Assuming 'updatedData' is an object with the updated properties
//             fileRecord.propertyToUpdate = updatedData;

//             const updateRequest = objectStore.put(fileRecord, fileId);

//             updateRequest.onsuccess = function () {
//                 // File successfully updated
//                 successCallback();
//             };

//             updateRequest.onerror = function (event) {
//                 // Handle the error
//                 errorCallback(event.target.error);
//             };
//         };

//         getRequest.onerror = function (event) {
//             // Handle the error
//             errorCallback(event.target.error);
//         };

//         transaction.oncomplete = function () {
//             // Close the database connection when the transaction is complete
//             db.close();
//         };
//     };

//     request.onerror = function (event) {
//         // Handle the error
//         errorCallback(event.target.error);
//     };
// }


// updateFileInDB(dbName, objectStoreName, fileIdToUpdate, updatedData, 
//     function () {
//         console.log('File successfully updated in IndexedDB.');
//     },
//     function (error) {
//         console.error('Error updating file in IndexedDB:', error);
//     }
// );
