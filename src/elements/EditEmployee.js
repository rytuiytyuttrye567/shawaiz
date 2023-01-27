import Layout from "../Layout/Layout";
import EditEmployee from "../components/editEmployee";

function EditEmployeee() {
  return (
    <>
      <Layout login={true}>
        <EditEmployee />
      </Layout>
    </>
  );
}

export default EditEmployeee;
