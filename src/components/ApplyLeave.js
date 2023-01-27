import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { GetUser as user } from "../auth/user";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const ApplyLeave = () => {
  const DataAdmin = user();
  const [cookie] = useCookies(["DigiBytes"]);
  const leaveStruct = {
    reason: "",
    leave_type: "",
    from: "",
    to: "",
    id: "",
  };
  const [Data, SetData] = useState(leaveStruct);
  const [Employees, SetEmployees] = useState([]);

  async function handleSubmit() {
    const id = toast.loading("applying ...");

    // var now = new Date();
    // var dt1 = Date.parse(now);
    // var dt2 = Date.parse(Data.from);
    // if (dt2 < dt1) {
    //   return toast.update(id, {
    //     render: "Date Must Be Future Date",
    //     type: "info",
    //     isLoading: false,
    //     autoClose: 5000,
    //   });
    // }

    await axios
      .post(
        process.env.REACT_APP_SERVERURL + "auth/apply_leave",
        {
          ...Data,
        },
        { headers: { Authorization: `Bearer ${cookie?.token}` } }
      )
      .then((response) => {
        response = response.data;
        if (response.success) {
          SetData({ ...leaveStruct });
          toast.update(id, {
            render: "Successfully Apply",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.update(id, {
            render: response.message,
            type: "info",
            isLoading: false,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            autoClose: 4000,
            draggable: true,
          });
        }
      })
      .catch((error) => {
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
          render: "Failed To Apply For Leave",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }
  useEffect(() => {
    async function getData() {
      axios
        .get(process.env.REACT_APP_SERVERURL + "auth/employess", {})
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
  return (
    <Container>
      <Row>
        <Col lg={12} className="card-home-dboard">
          <div className="tbl_head_db">Apply Leave</div>
          <label className="label_inp_noed">Leave Type</label>
          <div className="inp_node_athscreen">
            <select
              className="inp_node_select"
              onChange={(e) => {
                SetData({ ...Data, leave_type: e.target.value });
              }}
            >
              <option></option>
              <option>Privilege Leave</option>
              <option>Marriage Leave</option>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Paternity Leave</option>
              <option>Bereavement Leave</option>
              <option>Loss of Pay / Leave Without Pay </option>
              <option>Maternity Leave</option>
              {DataAdmin.type === 1 ? (
                <>
                  <option>other</option>
                  <option>informed</option>
                  <option>Family Reason</option>
                </>
              ) : (
                ""
              )}
            </select>
          </div>
          <div className="inp_node_athscreen">
            <textarea
              placeholder="Detailed Reason"
              className="inp_node_textarea"
              onChange={(e) => {
                SetData({ ...Data, reason: e.target.value });
              }}
            ></textarea>
          </div>
          {DataAdmin.type === 1 ? (
            <>
              <label className="label_inp_noed">Employee</label>
              <div className="inp_node_athscreen">
                <select
                  className="inp_node_select"
                  onChange={(e) => {
                    SetData({ ...Data, id: parseInt(e.target.value) });
                  }}
                >
                  <option></option>
                  {Employees.map((v, i) => {
                    return (
                      <option value={v._id}>
                        {v.first_name} {v.last_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </>
          ) : (
            ""
          )}
          <label className="label_inp_noed">From</label>
          <div className="inp_node_athscreen">
            <input
              type="date"
              // min={new Date().toISOString().split("T")[0]}
              placeholder="Leave Start From"
              onChange={(e) => {
                SetData({ ...Data, from: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">To</label>
          <div className="inp_node_athscreen">
            <input
              type="date"
              placeholder="Leave End Date"
              onChange={(e) => {
                SetData({ ...Data, to: e.target.value });
              }}
            />
          </div>
          <div className="headerloginbtn">
            <button
              className="ml-0 w-100 btn-pink"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ApplyLeave;
