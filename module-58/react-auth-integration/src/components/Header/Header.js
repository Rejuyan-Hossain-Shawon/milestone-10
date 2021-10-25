import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import "./Header.css"

const Header = () => {
    const { user, logOut } = useAuth();
    return (
        <div className="header">
            <Link to="/home">Home</Link>
            <Link to="/shipping">Shipping</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>

            <span>{user.displayName} </span>

            {

                Object.keys(user).length !== 0 && <button onClick={logOut}>Log out</button>
            }
        </div>
    );
};

export default Header;