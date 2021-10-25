
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, FacebookAuthProvider, OAuthProvider } from "firebase/auth";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFacebook, faGoogle, faMicrosoft, faYahoo } from '@fortawesome/free-brands-svg-icons';
import './App.css';
import initializationAuthentication from "./Firebase/firebase.initialize";
// initialization authentication
initializationAuthentication();
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');
const yahooProvider = new OAuthProvider('yahoo.com');

function App() {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, provider)
      .then(result => {

        const userProfile = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,

        }
        setUser(userProfile);

      })

  }
  // handle sign out 
  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert("signOut SuccessFully");
      setUser("");
    }).catch((error) => {
      setError(error.message)
    });
  }
  // handle facebook sign in 
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user

        const logInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(logInUser);
        setError("");
      })
      .catch(error => setError(error.message))
  }
  // handle microsoft 
  const handleMicrosoftSignIn = () => {
    signInWithPopup(auth, microsoftProvider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  // handle yahoo 
  const handleYahooSignIn = () => {
    signInWithPopup(auth, yahooProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user

        const logInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(logInUser);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  return (
    <div className="App">

      {
        Object.keys(user).length === 0 ? <div>


          <button onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} />
            oogle</button>
          <button onClick={handleFacebookSignIn}><FontAwesomeIcon icon={faFacebook} />
            acebook</button>
          <button onClick={handleMicrosoftSignIn}><FontAwesomeIcon icon={faMicrosoft} />
            Microsoft</button>
          <button onClick={handleYahooSignIn}><FontAwesomeIcon icon={faYahoo} />
            Yahoo</button>
        </div> : <div>
          <button onClick={handleSignOut}>SignOut</button>
          <h2>Welcome {user.name}</h2>
          <p>I know your email is : {user.email}</p>
          <img src={user.photo} alt="" />
          <p>{error}</p>
        </div>
      }

    </div>
  );
}

export default App;
