import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Student } from '../../../models';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
interface Props {
  studentList: Student[];
}

interface State {}

export class StudentRankingList extends Component<Props, State> {
  state = {};

  render() {
    const { studentList } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Mark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.mark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect()(StudentRankingList);
