import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const Login = () => {
    const { signInUsingGoogle, signInUsingGithub } = useAuth();
    return (
        <div>
            <h2>Please Login</h2>
            <button onClick={signInUsingGoogle}>Google sign in</button>
            <br />
            <button onClick={signInUsingGithub}>Github sign in</button>
            <br />
            <Link to="/register">New user?</Link>
        </div>
    );
};

export default Login;