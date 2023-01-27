import Layout from "../Layout/Layout";
import Employees from "../components/Employees";

function Employeess() {
  return (
    <>
      <Layout login={true}>
        <Employees />
      </Layout>
    </>
  );
}

export default Employeess;
