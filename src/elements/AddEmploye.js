import Layout from "../Layout/Layout";
import AddEmployee from "../components/addemployee";

function AddEmployeee() {
  return (
    <>
      <Layout login={true}>
        <AddEmployee />
      </Layout>
    </>
  );
}

export default AddEmployeee;
