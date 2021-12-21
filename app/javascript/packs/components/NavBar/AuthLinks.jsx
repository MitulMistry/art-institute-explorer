import React from 'react';
import { Link } from 'react-router-dom';

export const AuthLinks = ({ currentUser, logout }) => {

  const sessionLinks = () => (
    <ul>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
    </ul>
  );

  const authenticatedLinks = () => (
    <ul>
      <li><Link to={`/users/${currentUser.id}`}>Profile</Link></li>
      <li><a href="#" onClick={logout()}>Logout</a></li>
    </ul>
  );

  return currentUser ? authenticatedLinks() : sessionLinks();
};
