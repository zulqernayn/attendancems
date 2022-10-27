import UserView from "./pages/userView";
import Router, { route } from 'preact-router';
import LoginView from "./pages/LoginView";
import RegisterationView from "./pages/RegistrationView";
import AttendanceView from "./pages/attendanceView";
import AdminView from "./pages/adminView";
import { Toaster } from "react-hot-toast";
import DashBoardView from "./pages/dashboardView";

export function App() {

  return (
    <>
      <Router>
        <LoginView
        //@ts-ignore
          path="/login"/>
        <RegisterationView
        //@ts-ignore
        path="/"/>
        <DashBoardView
        //@ts-ignore
          path="/dashboard"/>
        <AttendanceView
        //@ts-ignore
        path="/user/:email/viewAttendance"
        />
        <AdminView 
        //@ts-ignore
        path="/admin"/>
      </Router>
      <Toaster/>
    </>
  )
}
