import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  Typography
} from '@mui/material';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../app/store';
import { City, ListParams } from '../../../models';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { studentAction, StudentState } from '../studentSlide';
import * as S from './ListPage.styled';

interface Props extends StudentState {
  // dispatch: Dispatch;
  setFilter: (value: ListParams) => void;
  fetchStudentList: (value: ListParams) => void;
  setFilterWithDebounce: (value: ListParams) => void;
  cityList: City[];
}

type State = {};

const convertListToMap = (list: City[]) => {
  return list.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {});
};

export class ListPage extends Component<Props, State> {
  handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    this.props.setFilter({
      ...this.props.filter,
      _page: page,
    });
  };

  componentDidMount(): void {
    const { filter, fetchStudentList } = this.props;

    fetchStudentList(filter);
  }
  componentDidUpdate(prevProps: Props) {
    const { filter, fetchStudentList } = this.props;
    if (filter !== prevProps.filter) {
      fetchStudentList(filter);
    }
  }

  handleSearchChange = (newFilter: ListParams) => {
    const { setFilterWithDebounce } = this.props;
    setFilterWithDebounce(newFilter);
  };

  handleFilterChange = (newFilter: ListParams) => {
    const { setFilter } = this.props;
    setFilter(newFilter);
  };

  render() {
    const { loading, filter, list, pagination, cityList } = this.props;
    return (
      <Box sx={S.root}>
        {loading && <LinearProgress sx={S.loading} />}
        <Box sx={S.titleContainer}>
          <Typography variant="h4">Students</Typography>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Box>

        <Box mb={3}>
          <StudentFilters
            filter={filter}
            cityList={cityList}
            onChange={this.handleFilterChange}
            onSearchChange={this.handleSearchChange}
          />
        </Box>

        <StudentTable cityMap={convertListToMap(cityList)} studentList={list} />
        <Box mt={2} sx={S.containerPagination}>
          <Pagination
            showFirstButton
            showLastButton
            color="primary"
            count={Math.ceil(pagination._totalRows / pagination._limit)}
            page={pagination?._page}
            onChange={this.handleChange}
          />
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loading: state.student.loading,
  list: state.student.list,
  filter: state.student.filter,
  pagination: state.student.pagination,
  cityList: state.city.list,
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(studentAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
