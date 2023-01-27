import Layout from "../Layout/Layout";
import AddApplyLeave from "../components/ApplyLeave";

function ApplyLeave() {
  return (
    <>
      <Layout login={true}>
        <AddApplyLeave />
      </Layout>
    </>
  );
}

export default ApplyLeave;
