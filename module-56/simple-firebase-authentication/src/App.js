
import './App.css';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';


initializeAuthentication();
// google sign in setting
const googleProvider = new GoogleAuthProvider();
// github sign in setting
const githubProvider = new GithubAuthProvider();
// facebook sign in provider 
const facebookProvider = new FacebookAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then(result => {
        // The signed-in user info.
        console.log(result.user);
        const { displayName, email, photoURL } = result.user;

        const logInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(logInUser);

      })
      .catch(error => console.log(error.message))
  }
  // handle github sign in btn
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        // The signed-in user info.


        const { displayName, email, photoURL } = result.user
        console.log(result.user);
        const logInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(logInUser);
      })
  }
  // handle facebook sign in
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user
        console.log(result.user);
        const logInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(logInUser);
      })
  }
  // hadnle sign out btn 

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("sign out completed");
        setUser({});
      }).catch((error) => {
        // An error happened.
        alert("sign not done yet");
      });
  }
  return (
    <div className="App">
      {
        Object.keys(user).length === 0 ? <div><button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
          <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
        </div>
          : <button onClick={handleSignOut}>Sign Out</button>
      }
      <br />
      {
        user.photo && <div>
          <h1>Welcome {user.name}</h1>
          <p>I know your email {user.email}</p>

          <div>
            <img src={user.photo} alt="" />
          </div>


        </div>
      }
    </div>
  );
}

export default App;
