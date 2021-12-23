import React from 'react';
import { Link } from 'react-router-dom';

export const AuthLinks = ({ currentUser, logout }) => {

    const sessionLinks = () => (
      <ul className="auth-links">
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    const authenticatedLinks = () => (
      <ul className="auth-links">
        <li><Link to={`/users/${currentUser.id}`}>Profile</Link></li>
        <li><Link to="/" onClick={logout}>Logout</Link></li>
      </ul>
    );

    return currentUser ? authenticatedLinks() : sessionLinks();
};
