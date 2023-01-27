import Layout from "../Layout/Layout";
import TransCoin from "../components/TransCoin";

function Transfer() {
  return (
    <>
      <Layout login={true}>
        <TransCoin />
      </Layout>
    </>
  );
}

export default Transfer;
