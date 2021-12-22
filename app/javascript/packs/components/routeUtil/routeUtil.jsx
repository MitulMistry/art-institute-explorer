import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Referenced from: https://reactrouter.com/docs/en/v6/examples/auth
// https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src/App.tsx

function ProtectedRouteComponent({ children, loggedIn }) {
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

function AuthRouteComponent({ children, loggedIn }) {
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.id)
});

export const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteComponent);

export const AuthRoute = connect(mapStateToProps)(AuthRouteComponent);