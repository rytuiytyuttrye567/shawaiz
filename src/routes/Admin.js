import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../elements/Home";
import AddEmployee from "../elements/AddEmploye";
import Profile from "../elements/Profile";
import EditEmployee from "../elements/EditEmployee";
import Employees from "../elements/Employees";
import AddManager from "../elements/AddManager";
import Managers from "../elements/Managers";
import VerifyLeaves from "../elements/VerifyLeaves";
import EmployeeData from "../elements/EmployeeData";
import DayData from '../elements/DayData';
import ApplyLeave from '../elements/ApplyLeave'
import MarkAttendenceDirect from '../elements/MarkAttendenceDirect'

const RoutesWeb = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/add-manager" element={<AddManager />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/:id" element={<EditEmployee />} />
      <Route path="/verify-leaves" element={<VerifyLeaves />} />
      <Route path="/day-data" element={<DayData />} />
      <Route path="/employee-data" element={<EmployeeData />} />
      <Route path="/mark-attendence-direct" element={<MarkAttendenceDirect />} />
      <Route path="/employee-data/:mail" element={<EmployeeData />} />
      <Route path="/managers" element={<Managers />} />
      <Route path="/apply-leave" element={<ApplyLeave />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Home />}></Route>
    </Routes>
  );
};
export default RoutesWeb;
