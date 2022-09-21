import { connect } from 'react-redux';
import React, { Component } from 'react';
import { City, Student } from '../../../models';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { capitalizeString, getMarkColor } from '../../../utils';
interface Props {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

interface State {}

export class StudentRankingList extends Component<Props, State> {
  state = {};

  render() {
    const { studentList, onEdit, onRemove, cityMap } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{capitalizeString(row.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(row.mark)} fontWeight="bold">
                    {row.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[row.city]?.name}</TableCell>

                <TableCell align="right">
                  <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                      sx={{ mr: 1 }}
                      variant="contained"
                      color="secondary"
                      onClick={() => onEdit?.(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => onRemove?.(row)}
                    >
                      Remove
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect()(StudentRankingList);
