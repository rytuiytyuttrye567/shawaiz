import Layout from "../Layout/Layout";
import DayDataTable from "../components/DayData";

function DayData() {
  return (
    <>
      <Layout login={true}>
        <DayDataTable />
      </Layout>
    </>
  );
}

export default DayData;
