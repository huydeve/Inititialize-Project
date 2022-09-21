import { Route, Routes } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components/Common';
import { Admin } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';
import DashBoard from './features/dashboard/DashBoard';
import Student from './features/student';
import AddEditPage from './features/student/pages/AddEditPage';
import ListPage from './features/student/pages/ListPage';
function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route element={<Admin />}>
          <Route path="admin">
            <Route path="dashboard" element={<DashBoard />} />
            <Route element={<Student/>}>
              <Route path="student" element={<ListPage />} />
              <Route path="student">
                <Route path="add" element={<AddEditPage />} />
                <Route path=":studentId" element={<AddEditPage />} />
              </Route>
            </Route>
          </Route>
          {/* <Route path="/admin/student" element={<Student />}></Route>
          <Route path="/admin/student/add" element={<AddEditPage />} />
          <Route path="/admin/student/:studentId" element={<AddEditPage />} /> */}
        </Route>
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
