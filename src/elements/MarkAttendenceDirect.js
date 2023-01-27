import Layout from "../Layout/Layout";
import MarkAttendence from "../components/MarkAttendence";

function MarkAttendenceDirect() {
  return (
    <>
      <Layout login={true}>
        <MarkAttendence />
      </Layout>
    </>
  );
}

export default MarkAttendenceDirect;
