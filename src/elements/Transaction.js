import Layout from "../Layout/Layout";
import TransactionTable from "../components/TransactionTable";

function Transaction() {
  return (
    <>
      <Layout login={true}>
        <TransactionTable />
      </Layout>
    </>
  );
}

export default Transaction;
