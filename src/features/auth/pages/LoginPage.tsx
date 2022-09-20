import { Paper, Typography, Box, Button } from '@mui/material';
import { Dispatch } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../app/store';
import myClassNames from '../../../utils/myClassNames';
import { login } from '../authSlice';

import styles from './LoginPage.module.scss';

type LoginProps = {
  dispatch: Dispatch;
};
type LoginStates = {};

const cx = myClassNames(styles);
class LoginPage extends Component<LoginProps, LoginStates> {
  handleLogin = () => {
    console.log('hello');
    
    this.props.dispatch(
      login({
        username: '',
        password: '',
      })
    );
  };
  render() {
    return (
      <div className={cx('root')}>
        <Paper elevation={1} className={cx('paper')}>
          <Typography variant="h5" component="h1">
            Student Management
          </Typography>
          <Box mt={4}>
            <Button
              className={cx('button')}
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  
});

export default connect(mapStateToProps)(LoginPage);
