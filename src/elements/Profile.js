import Layout from "../Layout/Layout";
import Profilee from "../components/Profile";

function Profile() {
  return (
    <>
      <Layout login={true}>
        <Profilee />
      </Layout>
    </>
  );
}

export default Profile;
