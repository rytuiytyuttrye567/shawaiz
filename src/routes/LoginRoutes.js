import { Routes, Route } from "react-router-dom";
import Signin from "../elements/Signin";

const RoutesWeb = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<Signin />}></Route>
    </Routes>
  );
};
export default RoutesWeb;
