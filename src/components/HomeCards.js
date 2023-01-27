import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { GetUser as user } from "../auth/user";
import addManager from "../icons/add-manager.svg";
import attendence from "../icons/attendence.svg";
import companyManagers from "../icons/company-managers.svg";
import diary from "../icons/diary.svg";
import adduser from "../icons/add-user.svg";
import userbook from "../icons/user-book.svg";
import nature from "../icons/nature.svg";
import volunteer from "../icons/volunteer-icon.svg";
import virtualReality from "../icons/virtual-reality.svg";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Info from "./HomeComponents/info";
import momenttz from "moment-timezone";

const Card = () => {
  const Data = user();
  const [currentDate,setcurrentDate] = useState(momenttz().tz("Asia/Karachi").format("DD-MM-YYYY hh:mm"));
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const EmployeeCards = () => {
    const [cookie] = useCookies(["DigiBytes"]);
    const [Data, SetData] = useState({
      presents: 0,
      late: 0,
      absents: 0,
      leave: 0,
    });
    useEffect(() => {
      async function getData() {
        axios
          .get(process.env.REACT_APP_SERVERURL + "auth/attendenceCount", {
            headers: { Authorization: `Bearer ${cookie?.token}` },
          })
          .then((response) => {
            response = response.data;
            if (response.success) {
              SetData(response.Data);
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
              render: "Failed To Get",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          });
      }
      getData();
    }, []);
    return (
      <>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/attendence`}>
            <img src={diary} />
            <div className="d-flex justify-content-between">
              <div className="cheadsm_db">Present</div>
              <div className="cheadsm_db">{Data.presents}</div>
            </div>
            {/* <div className="d-flex justify-content-between">
              <div className="cheadsm_db">Absent</div>
              <div className="cheadsm_db">{Data.absents}</div>
            </div> */}
            <div className="d-flex justify-content-between">
              <div className="cheadsm_db">Leave</div>
              <div className="cheadsm_db">{Data.leave}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="cheadsm_db">Late</div>
              <div className="cheadsm_db">{Data.late}</div>
            </div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/mark-attendence`}>
            <img src={attendence} />
            <div className="cheadsm_num mt-3">Mark Attendence</div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/apply-leave`}>
            <img src={nature} />
            <div className="cheadsm_num mt-3">Apply Leave</div>
          </Link>
        </Col>
      </>
    );
  };
  const AdminCards = () => {
    const [CountData, SetCountData] = useState({
      emplyees: 0,
      managers: 0,
      leaves: 0,
    });
    useEffect(() => {
      async function getData() {
        axios
          .get(process.env.REACT_APP_SERVERURL + "auth/getCounts", {})
          .then((response) => {
            response = response.data;
            if (response.success) {
              SetCountData(response.Data);
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
              render: "Failed To Get Employees",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          });
      }
      getData();
    }, []);
    return (
      <>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/add-employee`}>
            <img src={adduser} />
            <div className="cheadsm_num mt-3">Create Employee</div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/employees`}>
            <img src={userbook} />
            <div className="cheadsm_num mt-3">
              Employees ({CountData.emplyees})
            </div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/add-manager`}>
            <img src={addManager} />
            <div className="cheadsm_num mt-3">Create Manager</div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/managers`}>
            <img src={companyManagers} />
            <div className="cheadsm_num mt-3">
              Managers ({CountData.managers})
            </div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/verify-leaves`}>
            <img src={nature} />
            <div className="cheadsm_num mt-3">Leaves ({CountData.leaves})</div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/employee-data`}>
            <img src={virtualReality} />
            <div className="cheadsm_num mt-3">Employee Record</div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/day-data`}>
            <img src={volunteer} />
            <div className="cheadsm_num mt-3">Day Attendence</div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/apply-leave`}>
            <img src={nature} />
            <div className="cheadsm_num mt-3">Add Leave</div>
          </Link>
        </Col>
        <Col lg={3} sm={6} className="card-home-dboard">
          <Link to={`/mark-attendence-direct`}>
            <img src={attendence} />
            <div className="cheadsm_num mt-3">Mark Attendence</div>
          </Link>
        </Col>
      </>
    );
  };
  return (
    <>
      <Container>
        <Row className="row_hcrd">
          <Col md={12} className="mt-4">
            <div className="cheadsm_num">
              Welcome {Data?.first_name + " " || " "}
              {Data?.last_name || " "}
            </div>
            <div className="cheadsm_db">
              {currentDate}
            </div>
          </Col>
          {Data.type === 0 ? (
            <EmployeeCards />
          ) : Data.type === 1 ? (
            <AdminCards />
          ) : (
            ""
          )}
          {Data.type === 0 ? Info(Data, false) : ""}
        </Row>
      </Container>
    </>
  );
};
export default Card;
