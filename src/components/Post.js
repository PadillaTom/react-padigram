import React from 'react';
import Avatar from '@material-ui/core/Avatar';

function Post({ username, imageUrl, caption }) {
  //Return:
  return (
    <React.Fragment>
      <div className='post-container'>
        <div className='post-header'>
          {' '}
          <Avatar
            className='post-avatar'
            alt='Tom Padi'
            src='/static/images/avatar/1.jpg'
          ></Avatar>
          <h3>{username}</h3>
        </div>
        <img src={imageUrl} alt='post-img' className='post-img' />
        <div className='post-text'>
          <span>{username}</span>
          <h4>{caption}</h4>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Post;
