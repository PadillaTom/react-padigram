import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db, auth } from './firebase';
import ImageUpload from './components/ImageUpload';
// For Modal
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
// Input Login:
import { Input } from '@material-ui/core';
// Instaram Embed:
import InstagramEmbed from 'react-instagram-embed';

// Main:
function App() {
  // :::::::::::::: State
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [openSignin, setOpenSignin] = useState(false);
  // ::::::::::: Modal
  const [modalStyle] = useState(getModalStyle);
  function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '35rem',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();

  //:::::::::: Input Signup
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    // Close Modal
    setOpen(false);
  };
  //:::::::::: Input Login
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    // Close Modal
    setOpenSignin(false);
  };

  // ::::::::::::: FireBase UseEffect: [] Runs just Once, when componentloads.
  // --> Retrieve from DB
  useEffect(() => {
    // --> DB:
    db.collection('posts').onSnapshot((snapshot) => {
      // Will Run on every Upload:
      // DOCS --> Propiedad de Firebase para ingresar a la DATA de "posts"
      // Creamos un objeto destructurando la data necesaria (data: all + id)
      //
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  });
  // --> Authentication
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //Logged In:
        // console.log(authUser);
        setUser(authUser);
        //Display Username:
        if (authUser.displayName) {
          //Don't update it
        } else {
          // If Just created
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        //Logged Out:
        setUser(null);
      }
    });
    return () => {
      // Some Cleanup if user Unsuscribes
      unsuscribe();
    };
    // User and Username --> Everytime it changes, they fire this function
  }, [user, username]);

  // ::::::::: Main App
  return (
    <>
      {/* Header Section */}
      <section className='section'>
        <div className='header-container'>
          {/* :::::::: Modals :::::::::: */}
          <div className='modal-container'>
            <Modal
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            >
              <div style={modalStyle} className={classes.paper}>
                <form className='form-signup'>
                  <center>
                    <div className='padigram-logo'>
                      <h2>
                        casadel
                        <span>C</span>
                      </h2>
                    </div>
                  </center>

                  <Input
                    placeholder='username'
                    type='text'
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  ></Input>
                  <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Input>
                  <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Input>
                  <Button type='submit' onClick={signUp}>
                    Sign up
                  </Button>
                </form>
              </div>
            </Modal>
            <Modal
              open={openSignin}
              onClose={() => {
                setOpenSignin(false);
              }}
            >
              <div style={modalStyle} className={classes.paper}>
                <form className='form-signup'>
                  <center>
                    <div className='padigram-logo'>
                      <h2>
                        casadel
                        <span>C</span>
                      </h2>
                    </div>
                  </center>

                  <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Input>
                  <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Input>
                  <Button type='submit' onClick={signIn}>
                    Login
                  </Button>
                </form>
              </div>
            </Modal>
          </div>
          {/* :::::::::: End Modals ::::::::::: */}
          <div className='app_header'>
            <div className='padigram-logo'>
              <h2>
                casadel
                <span>C</span>
              </h2>
            </div>
            <div className='log-buttons-container'>
              {user ? (
                <Button onClick={() => auth.signOut()}>Logout</Button>
              ) : (
                <div className='login-container'>
                  <Button onClick={() => setOpenSignin(true)}>Login</Button>
                  <Button onClick={() => setOpen(true)}>Sign up</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* End Header Section */}

      {/* Posts Component */}
      <section className='section'>
        <div className='posts-container'>
          <div className='main-page-left'>
            {posts.map(({ id, post }) => (
              <Post
                key={id}
                username={post.username}
                imageUrl={post.imageUrl}
                caption={post.caption}
              ></Post>
            ))}
          </div>
          <div className='main-page-right'>
            {/* Instagram Embed */}
            <InstagramEmbed
              url='https://instagr.am/p/Zw9o4/'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
            {/* End Instagram Embed */}
          </div>
        </div>
      </section>
      {/* End Post Component */}

      {/* Upload Component */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName}></ImageUpload>
      ) : (
        <h3>Please Login to make a Post</h3>
      )}
      {/* End Upload Component */}
    </>
  );
}

// Export:
export default App;
