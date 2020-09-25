import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from 'firebase';

function Post({ postId, username, imageUrl, caption, user }) {
  // State for Comments:
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  // UseEffect for Commenting:
  useEffect(() => {
    // Importante para Cleanup
    let unsuscribe;
    // Si hay POST: Meterme a la DB y setComment la Data para dicho POST
    if (postId) {
      unsuscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    // Limpiamos Todo una vez Setteado
    return () => {
      unsuscribe();
    };
    // Only Reload when PostID has a Change. **** Everytime we use Variable, pass it as dependency
  }, [postId]);

  // Post Btn Functionality:
  const postComment = (e) => {
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      username: user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };
  //Return:
  return (
    <React.Fragment>
      <div className='single-post-container'>
        <div className='post-header'>
          <Avatar
            className='post-avatar'
            alt={username}
            src='/static/images/avatar/1.jpg'
          ></Avatar>
          <h3>{username}</h3>
        </div>
        <img src={imageUrl} alt='post-img' className='post-img' />
        <div className='post-text'>
          <span>{username}</span>
          <h4>{caption}</h4>
        </div>
        <div className='comments-container'>
          <div className='show-comments-container'>
            {comments.map((item, index) => (
              <div key={index} className='comment-user-text-container'>
                <b className='comment-username'>{item.username}</b>{' '}
                <div className='comment-text-container'>{item.text}</div>
              </div>
            ))}
          </div>
          {user && (
            <form className='comments-form-container'>
              <input
                type='text'
                className='comment-input'
                placeholder='Comments...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                disabled={!comment}
                className='comment-button'
                type='submit'
                onClick={postComment}
              >
                Post
              </button>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Post;
