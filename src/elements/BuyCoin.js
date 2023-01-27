import Layout from "../Layout/Layout";
import BuyWithCard from "../components/BuyWithCard";

function BuyCoin() {
  return (
    <>
      <Layout login={true}>
        <BuyWithCard />
      </Layout>
    </>
  );
}

export default BuyCoin;
