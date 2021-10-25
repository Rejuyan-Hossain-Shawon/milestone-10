import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();

const GoogleProvider = new GoogleAuthProvider();
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, SetIsLogin] = useState(false);
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
  }

  //  handle submit btn of form for registration
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;

    }
    // password strength checking
    if (!/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      setError("Password must have one uppercase letters and one digit");
      return;
    }
    isLogin ? processLogin(email, password) : registerNewUser(email, password);


  }
  // handle input email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  //  handle input  password change 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  // login toggle 
  const toggleLogin = (e) => {
    SetIsLogin(e.target.checked);
  }
  // create a new user resgistration
  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError("");
        verifyEmail();
        setUserName();
      })
      .catch(error => setError(error.message))
  }
  // process login 
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError("");
      })
      .catch(error => setError(error.message))
  }
  // email verify 
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => alert("Email Already Sent"))
  }
  // handle reset password 
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Reset Email sent"))
  }
  // handle name 
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  // set user name 
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(result => { })
  }
  return (
    <div className="mx-5">
      <h3>Please  {isLogin ? "Login" : "Registration"}</h3>
      <form onSubmit={handleRegistrationSubmit}>

        {
          !isLogin && <div className="row mb-3">
            <label htmlFor="inputName3" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input required onBlur={handleNameChange} type="text" className="form-control" id="inputName3" />
            </div>
          </div>
        }

        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input required onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input required type="password" onBlur={handlePasswordChange} className="form-control" id="inputPassword3" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-danger">{error}</div>
        <button type="submit" className="btn btn-primary">{isLogin ? "Login" : "Register"}</button>
        <button type="button" onClick={handleResetPassword} className="btn btn-secondary btn-sm m-3">Reset Password</button>
      </form>
      <br /><br /><br /><br />
      <div>------------------------------------------------</div>
      <br /><br /><br /><br />
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
