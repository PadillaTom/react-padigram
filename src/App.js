import React, { useState } from 'react';
import './App.css';
import Post from './components/Post';

// Main:
function App() {
  // --> Post State:
  const [posts, setPosts] = useState([
    {
      username: 'TomPadiTom',
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/02/05/15/04/zen-2040340_960_720.jpg',
      caption: 'This app is Amazing!',
    },
    {
      username: 'La Katy',
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/01/13/08/08/tori-1976609_960_720.jpg',
      caption: 'Aguante el Paco',
    },
  ]);
  return (
    <>
      {/* Header Section */}
      <section className='section'>
        <div className='app_container'>
          <div className='app_header'>
            <div className='padigram-logo'>
              <h2>
                casadel
                <span>C</span>
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/* Posts Section */}
      {posts.map((post) => (
        <Post
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        ></Post>
      ))}
    </>
  );
}

// Export:
export default App;
