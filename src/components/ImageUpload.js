import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import firebase from 'firebase';

function ImageUpload({ username }) {
  // State:
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  // Change Event for File Upload:
  const handleChange = (e) => {
    // Get first file of Array
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // Use such file as SetImage
    }
  };
  // Upload Function:
  const handleUpload = (e) => {
    // Upload will Create the Images folder, and store the Image[0] into it.
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    // Que hace UPLOAD TAKS? -->
    uploadTask.on(
      // Importante: Tipo snapshot
      'state_changed',
      // Progress Function --> Will do math and display 0-100%
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      // Error Function to Display Error (in console only)
      (error) => {
        console.log(error);
      },
      // Complete Function: Go get a download Link for me to use
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          // Once all before is done:
          // Tomaremos una Timestamp (orden de subida), Caption, ImageUrl
          // Para ser Uploaded!!!!!!
          .then((url) => {
            db.collection('posts').add({
              // La display en orden de subida.
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            // RESET Everything
            setProgress(0);
            setCaption('');
            setImage(null);
          });
      }
    );
  };
  //Main:
  return (
    <>
      <section className='upload-section'>
        <div className='image-upload-container'>
          <progress
            className='image-upload-progress'
            value={progress}
            max='100'
          ></progress>
          <input
            type='text'
            placeholder='Enter a Caption...'
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          />
          <input type='file' onChange={handleChange} />
          <Button onClick={handleUpload}>Post!</Button>
        </div>
      </section>
    </>
  );
}

export default ImageUpload;
