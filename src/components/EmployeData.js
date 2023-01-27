import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Info from "./HomeComponents/info";
import TableCard from "./TransactionTable";
import { useParams } from "react-router-dom";

const EmployeData = () => {
  const [Data, SetData] = useState({});
  const [Inputmail, SetMail] = useState();
  let { mail } = useParams();
  const [cookie] = useCookies(["DigiBytes"]);
  function validateMail(e) {
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    return validateEmail(e);
  }
  async function fetchDataByEmail(mail) {
    SetData({});
    if (mail)
      await axios
        .get(process.env.REACT_APP_SERVERURL + "auth/data_by_mail/" + mail, {
          headers: { Authorization: `Bearer ${cookie?.token}` },
        })
        .then((response) => {
          response = response.data;
          console.log(response);
          if (response.success) {
            SetData(response.Data?.employee);
          }
        })
        .catch((error) => {
          const id = toast.loading("");
          console.log(error);
          if (error.response) {
            if (error.response.status === 401) {
              toast.update(id, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 5000,
              });
              return false;
            }
          }
          toast.update(id, {
            render: "Failed To Load Record",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        });
  }
  useEffect(() => {
    const email = mail;
    if (mail) {
      fetchDataByEmail(email);
      SetMail(mail);
    }
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="card-home-dboard">
            <div className="tbl_head_db">Employee Full Record</div>
            <label className="label_inp_noed">Employee Email</label>
            <div className="inp_node_athscreen">
              <input
                type="text"
                value={Inputmail}
                placeholder="Enter Email Address"
                onChange={(e) => {
                  SetMail(e.target.value);
                  if (validateMail(e.target.value)) {
                    fetchDataByEmail(e.target.value);
                  }
                }}
              />
            </div>
          </Col>
          {Object.keys(Data).length === 0 ? "" : Info(Data, true)}
        </Row>
      </Container>
      {Object.keys(Data).length === 0 ? "" : <TableCard userID={Data._id} />}
    </>
  );
};
export default EmployeData;
