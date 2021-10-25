import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, GithubAuthProvider } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");

    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                setUser(result.user);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const signInUsingGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                setUser(result.user);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("state change inside", user)
                setUser(user);
            }
            else {

            }
        })
    }, [])
    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser("");

            }).catch((error) => {
                setError(error.message);
            });
    }
    return {
        user,
        error,
        signInUsingGoogle,
        signInUsingGithub,
        logOut
    }
}
export default useFirebase;