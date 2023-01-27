import Layout from "../Layout/Layout";
import LeavesTable from "../components/LeavesTable";

function Transaction() {
  return (
    <>
      <Layout login={true}>
        <LeavesTable />
      </Layout>
    </>
  );
}

export default Transaction;
