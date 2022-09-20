import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { login, logout } from '../../features/auth/authSlice';

export interface IAppProps {
  dispatch: Dispatch;
}

class Header extends React.Component<IAppProps> {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  handleLogin = () => {
    this.props.dispatch(login({
      username: 'hello',
      password: 'password',
    }));
  }

  public render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{boxShadow: 'none'}}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Management
            </Typography>
            <Button onClick={this.handleLogin} color="inherit">
              Login
            </Button>
            <Button onClick={this.handleLogout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default connect()(Header);
