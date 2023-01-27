import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ManagersPopup from "./popups/Managers";

const Managersc = () => {
  const [Managers, SetManagers] = useState([]);
  const [Popup, SetPopup] = useState();

  useEffect(() => {
    async function getData() {
      axios
        .get(process.env.REACT_APP_SERVERURL + "auth/managers", {})
        .then((response) => {
          response = response.data;
          if (response.success) {
            SetManagers(response.Data);
          } else {
            const id = toast.loading("");
            toast.update(id, {
              render: response.message,
              type: "info",
              isLoading: false,
              pauseOnHover: false,
              pauseOnFocusLoss: false,
              autoClose: 3000,
              draggable: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          const id = toast.loading("Server Connection Failed");
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
            render: "Failed To Load Managers",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        });
    }
    getData();
  }, []);

  function search(v) {
    var input, filter, table, tr, td, i, txtValue;
    input = v;
    filter = input.toUpperCase();
    table = document.getElementById("table_employees");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="card-home-dboard">
            <div className="tbl_head_db">Filter</div>
            <label className="label_inp_noed">Name</label>
            <div className="inp_node_athscreen">
              <input
                type="text"
                placeholder="Search By Name"
                onChange={(e) => {
                  search(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col lg={12} className="card-home-dboard">
            <div className="tbl_head_db">Managers ({Managers.length})</div>
            <Table hover id="table_employees">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Position</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Managers.map((v, i) => {
                  return (
                    <tr key={v._id}>
                      <td>
                        {v.first_name} {v.last_name}
                      </td>
                      <td>{v.email}</td>
                      <td>{v.phone}</td>
                      <td>{v.position}</td>
                      <td className="btns_table_trxn">
                        <button
                          onClick={() => {
                            SetPopup(
                              <ManagersPopup Data={v} SetPopup={SetPopup} />
                            );
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_403_3026)">
                              <path
                                d="M23.2709 9.41891C21.7199 6.89291 18.1919 2.65491 11.9999 2.65491C5.80787 2.65491 2.27987 6.89291 0.728868 9.41891C0.249396 10.1944 -0.00457764 11.0881 -0.00457764 11.9999C-0.00457764 12.9117 0.249396 13.8054 0.728868 14.5809C2.27987 17.1069 5.80787 21.3449 11.9999 21.3449C18.1919 21.3449 21.7199 17.1069 23.2709 14.5809C23.7503 13.8054 24.0043 12.9117 24.0043 11.9999C24.0043 11.0881 23.7503 10.1944 23.2709 9.41891ZM21.5659 13.5339C20.2339 15.6999 17.2189 19.3449 11.9999 19.3449C6.78087 19.3449 3.76587 15.6999 2.43387 13.5339C2.149 13.073 1.99812 12.5418 1.99812 11.9999C1.99812 11.458 2.149 10.9269 2.43387 10.4659C3.76587 8.29991 6.78087 4.65491 11.9999 4.65491C17.2189 4.65491 20.2339 8.29591 21.5659 10.4659C21.8507 10.9269 22.0016 11.458 22.0016 11.9999C22.0016 12.5418 21.8507 13.073 21.5659 13.5339Z"
                                fill="#374957"
                              />
                              <path
                                d="M11.9998 6.99988C11.0109 6.99988 10.0442 7.29312 9.22194 7.84253C8.39969 8.39194 7.75883 9.17283 7.38039 10.0865C7.00195 11.0001 6.90294 12.0054 7.09586 12.9753C7.28879 13.9452 7.76499 14.8362 8.46425 15.5354C9.16352 16.2347 10.0544 16.7109 11.0243 16.9038C11.9942 17.0967 12.9996 16.9977 13.9132 16.6193C14.8268 16.2408 15.6077 15.6 16.1571 14.7777C16.7065 13.9555 16.9998 12.9888 16.9998 11.9999C16.9982 10.6743 16.4709 9.40344 15.5336 8.4661C14.5962 7.52876 13.3254 7.00147 11.9998 6.99988ZM11.9998 14.9999C11.4064 14.9999 10.8264 14.8239 10.3331 14.4943C9.83973 14.1646 9.45521 13.6961 9.22815 13.1479C9.00109 12.5998 8.94168 11.9966 9.05743 11.4146C9.17319 10.8327 9.45891 10.2981 9.87847 9.87856C10.298 9.459 10.8326 9.17328 11.4145 9.05752C11.9965 8.94177 12.5997 9.00118 13.1478 9.22824C13.696 9.4553 14.1646 9.83982 14.4942 10.3332C14.8238 10.8265 14.9998 11.4065 14.9998 11.9999C14.9998 12.7955 14.6837 13.5586 14.1211 14.1212C13.5585 14.6838 12.7954 14.9999 11.9998 14.9999Z"
                                fill="#374957"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_403_3026">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {Popup}
    </>
  );
};
export default Managersc;
