import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { NotFound, PrivateRoute } from './components/Common';
import { Admin } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';
import Button from '@mui/material/Button/Button';
import DashBoard from './features/dashboard';
import Student from './features/student';
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route element={<Admin />}>
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/student" element={<Student />} />
        </Route>
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
