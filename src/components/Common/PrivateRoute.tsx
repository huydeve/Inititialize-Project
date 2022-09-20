import { Component } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {};

type State = {};

export default class PrivateRoute extends Component<Props, State> {
  state = {};

  render() {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) return <Navigate to="/login" />;
    return <Outlet />; 
  }
}
