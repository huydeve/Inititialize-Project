import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Component } from 'react';
import { connect } from 'react-redux';
import { City, Student } from '../../../models';
import { capitalizeString, getMarkColor } from '../../../utils';
interface Props {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

interface State {
  open: boolean;
  selectedStudent: Student;
}

const initialStudent: Student = {
  name: '',
  age: 0,
  city: '',
  gender: 'male',
  mark: 0,
  id: '',
};

export class StudentRankingList extends Component<Props, State> {
  state = {
    open: false,
    selectedStudent: initialStudent,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRemoveClick = (row: Student) => {
    this.setState({ selectedStudent: row });
    this.setState({ open: true });
  };

  handleRemoveConfirm = () => {
    this.props.onRemove?.(this.state.selectedStudent);
    this.setState({ open: false });
  };

  render() {
    const { studentList, onEdit, onRemove, cityMap } = this.props;
    const { open, selectedStudent } = this.state;
    return (
      <>
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                        onClick={() => this.handleRemoveClick(row)}
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
        {/* Remove dialog */}
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'Remove a student ?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove students named "
              {selectedStudent.name}". This action can&apos;t be undo
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={this.handleRemoveConfirm}
              variant="contained"
              autoFocus
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default connect()(StudentRankingList);
