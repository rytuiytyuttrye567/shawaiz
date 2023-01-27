import Layout from "../Layout/Layout";
import HomeCard from "../components/HomeCards";

function Home() {
  return (
    <>
      <Layout login={true}>
        <HomeCard />
      </Layout>
    </>
  );
}

export default Home;
