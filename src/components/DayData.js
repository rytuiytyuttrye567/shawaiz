import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const DayData = () => {
  const [Employees, SetEmployees] = useState([]);

  useEffect(() => {
    async function getData() {
      axios
        .get(process.env.REACT_APP_SERVERURL + "auth/dayRecord", {})
        .then((response) => {
          response = response.data;
          if (response.success) {
            SetEmployees(response.Data);
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
            render: "Failed To Load Employees",
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
            <div className="tbl_head_db">Employees ({Employees.length})</div>
            <Table hover id="table_employees">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Attendence</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                </tr>
              </thead>
              <tbody>
                {Employees.map((v, i) => {
                  console.log(v);
                  return (
                    <tr key={v._id}>
                      <td>
                        {v.first_name} {v.last_name}
                      </td>
                      <td>{v.phone}</td>
                      <td>{v?.attendence?.Data?.status}</td>
                      <td>
                        {v?.attendence?.Data?.in_time !== "" &&
                        v?.attendence?.Data?.in_time !== undefined
                          ? moment(v?.attendence?.Data?.in_time).format(
                              "hh:mm:ss a"
                            )
                          : ""}
                      </td>
                      <td>
                        {v?.attendence?.Data?.out_time !== "" &&
                        v?.attendence?.Data?.out_time !== undefined
                          ? moment(v?.attendence?.Data?.out_time).format(
                              "hh:mm:ss a"
                            )
                          : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DayData;
