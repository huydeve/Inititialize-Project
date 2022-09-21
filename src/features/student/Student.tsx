import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { cityAction, citySelector } from '../city/citySlice';

type Props = {
  fetchCityList: () => void;
};

type State = {};

class Student extends Component<Props, State> {
  state = {};

  componentDidMount(): void {
    this.props.fetchCityList();
  }

  render() {
    return <Outlet />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(cityAction, dispatch);

export default connect(citySelector, mapDispatchToProps)(Student);
