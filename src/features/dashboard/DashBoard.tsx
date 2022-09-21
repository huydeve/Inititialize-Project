import { PeopleAlt } from '@mui/icons-material';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { Dispatch } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DashboardState } from '../../features/dashboard/dashboardSlice';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardActions, dashboardSelector } from './dashboardSlice';
import * as S from './DashBoard.styled';
interface Props extends DashboardState {
  dispatch: Dispatch;
}

class DashBoard extends Component<Props> {
  state = {};

  componentDidMount(): void {
    this.props.dispatch(dashboardActions.fetchData());
    
  }

  componentDidUpdate(prevProps: Props) {}

  render() {
    const {
      loading,
      lowestStudentList,
      rankingByCityList,
      statistics,
      highestStudentList,
    } = this.props;

    const statisticItemList = [
      {
        count: statistics.maleCount,
        icon: <PeopleAlt fontSize="large" color="primary" />,
        label: 'male',
      },
      {
        count: statistics.femaleCount,
        icon: <PeopleAlt fontSize="large" color="primary" />,
        label: 'female',
      },
      {
        count: statistics.hightMarkCount,
        icon: <PeopleAlt fontSize="large" color="primary" />,
        label: 'mark >= 8',
      },
      {
        count: statistics.lowMarkCount,
        icon: <PeopleAlt fontSize="large" color="primary" />,
        label: 'mark <= 5',
      },
    ];

    return (
      <Box sx={S.container}>
        {loading && <LinearProgress sx={S.loading} />}

        <Grid container spacing={3}>
          {statisticItemList.map((statisticItem, index) => (
            <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
              <StatisticItem
                icon={statisticItem.icon}
                label={statisticItem.label}
                value={statisticItem.count}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={4}>
          <Typography variant="h4">All student</Typography>
          <Box mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Widget title="Student with highest mark">
                  <StudentRankingList studentList={highestStudentList} />
                </Widget>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Widget title="Student with lowest mark">
                  <StudentRankingList studentList={lowestStudentList} />
                </Widget>
              </Grid>
            </Grid>
          </Box>

          <Box mt={5}>
            <Typography variant="h4">Rankings by city</Typography>
            
            <Box mt={2}>
              <Grid container spacing={3}>
                {rankingByCityList.map((ranking, index) => (
                  <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
                    <Widget title={ranking.cityName}>
                      <StudentRankingList studentList={ranking.rankingList} />
                    </Widget>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default connect(dashboardSelector)(DashBoard);
