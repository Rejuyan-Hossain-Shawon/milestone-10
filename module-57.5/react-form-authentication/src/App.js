import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initialization from './Firebase/firebase.initialize';

initialization();


function App() {
  const auth = getAuth();



  // state section
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  // event handler 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);

  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in 
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {

        setError(error.message);
      });

  }

  return (
    <div className="m-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" onBlur={handlePasswordChange} className="form-control" id="inputPassword3" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>
        {error}
        <br />
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    </div>
  );
}

export default App;
