import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../elements/Home";
import Transaction from "../elements/Transaction";
import BuyCoin from "../elements/BuyCoin";
import Profile from "../elements/Profile";
import ApplyLeave from '../elements/ApplyLeave'

const Employee = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/attendence" element={<Transaction />} />
      <Route path="/mark-attendence" element={<BuyCoin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/apply-leave" element={<ApplyLeave />} />
      <Route path="*" element={<Home />}></Route>
    </Routes>
  );
};
export default Employee;
