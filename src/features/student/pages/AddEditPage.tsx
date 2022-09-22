import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavigateFunction, Params } from 'react-router-dom';
import { toast } from 'react-toastify';
import student from '..';
import studentApi from '../../../api/studentApi';
import { withRouter } from '../../../hocs/withRouter';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';

type Props = {
  params: Readonly<Params<string>>;
  navigate: NavigateFunction;
};

type State = {
  student: any;
};

export class AddEditPage extends Component<Props, State> {
  studentId: string | undefined;
  student: Student | undefined;
  isEdit: boolean;

  constructor(props: Props) {
    super(props);
    this.studentId = this.props.params.studentId;
    this.isEdit = Boolean(this.studentId);
    this.state = {
      student: undefined,
    };
  }

  async fetchGetID(studentId: string) {
    try {
      const data: Student = await studentApi.getById(studentId);
      this.setState({ student: data });
    } catch (error) {
      console.log('Failed to fetch student details', error);
    }
  }
  componentDidMount(): void {
    if (!this.studentId) return;
    this.fetchGetID(this.studentId);
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.studentId && prevProps.params.studentId !== this.studentId)
      this.fetchGetID(this.studentId);
  }

  handleStudentFormSubmit = async (formValues: Student) => {
    if (this.isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    const message = this.isEdit
    toast.success('Save student successfully');
    // throw new Error('My testing error');

    this.props.navigate('/admin/student');
  };

  render() {
    const { student } = this.state;
    const isEdit = Boolean(this.studentId);
    const initialValues: Student = {
      name: '',
      age: '',
      mark: '',
      gender: 'male',
      city: '',
      ...student,
    } as Student;
    return (
      <Box>
        <Link to="/admin/student">
          <Typography
            variant="caption"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ChevronLeft /> &nbsp;Back to student list
          </Typography>
        </Link>
        <Typography variant="h4">
          {isEdit ? 'Update student info' : 'Add new student'}
        </Typography>
        {(!isEdit || Boolean(student)) && (
          <Box mt={3}>
            <StudentForm
              initialValues={initialValues}
              onSubmit={this.handleStudentFormSubmit}
            />
          </Box>
        )}
      </Box>
    );
  }
}

// const mapStateToProps = (state) => ({})

export default withRouter(connect()(AddEditPage));

// export default function AddEditPage() {
//   const history = useNavigate();
//   const { studentId } = useParams<{ studentId: string }>();
//   const isEdit = Boolean(studentId);
//   const [student, setStudent] = useState<Student>();

//   useEffect(() => {
//     if (!studentId) return;
//     // IFFE
//     (async () => {
//       try {
//         const data: Student = await studentApi.getById(studentId);
//         setStudent(data);
//       } catch (error) {
//         console.log('Failed to fetch student details', error);
//       }
//     })();
//     console.log('Student')
//   }, [studentId]);

//   const handleStudentFormSubmit = async (formValues: Student) => {
//     // TODO: Handle submit here, call API  to add/update student
//     // if (isEdit) {
//     //   await studentApi.update(formValues);
//     // } else {
//     //   await studentApi.add(formValues);
//     // }

//     // // Toast success

//     // // Redirect back to student list
//     // history.push('/admin/students');
//   };

//   const initialValues: Student = {
//     name: '',
//     age: '',
//     mark: '',
//     gender: 'male',
//     city: '',
//     ...student,
//   } as Student;

//   return (
//     <Box>
//       <Link to="/admin/student">
//         <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
//           <ChevronLeft /> Back to student list
//         </Typography>
//       </Link>

//       <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

//       {(!isEdit || Boolean(student)) && (
//         <Box mt={3}>
//           <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
//         </Box>
//       )}
//     </Box>
//   );
// }
