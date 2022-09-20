import { Dispatch } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Student } from '../../models';
import {
  dashboardActions,
  dashboardSelector,
  DashBoardStatistics,
  RankingByCity,
} from './dashboardSlice';

type Props = {
  dispatch: Dispatch;
  loading: boolean;
  statistics: DashBoardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
};

class DashBoard extends Component<Props> {
  state = {};

  componentDidMount(): void {
    this.props.dispatch(dashboardActions.fetchData());
  }

  componentDidUpdate(prevProps: Props) {}

  render() {
    const { loading, lowestStudentList, rankingByCityList, statistics, highestStudentList } =
      this.props;
    console.log({
      loading,
      lowestStudentList,
      rankingByCityList,
      statistics,
      highestStudentList,
    });

    return <div>DashBroad</div>;
  }
}

export default connect(dashboardSelector)(DashBoard);
