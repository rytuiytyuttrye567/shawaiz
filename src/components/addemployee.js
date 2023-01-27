import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CardFormCard = () => {
  const EmployeeStruc = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    birth_date: "",
    hire_date: "",
    salery: "",
    position: "",
    department: "",
    address: "",
    hours: "",
    shift_start: "",
    shift_end: "",
    relief_time: "",
    profile: "",
    machine: "",
  };
  const [Employee, SetEmployee] = useState(EmployeeStruc);
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const addEmplyee = async () => {
    const notify = (mess) => toast(mess);
    if (!validateEmail(Employee.email)) {
      notify("Enter Valid Email");
      return false;
    }
    const id = toast.loading("Creating");
    await axios
      .post(process.env.REACT_APP_SERVERURL + "auth/create_employee", {
        ...Employee,
      })
      .then((response) => {
        response = response.data;
        if (response.success) {
          SetEmployee(EmployeeStruc);
          toast.update(id, {
            render: "Successfully Created",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
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
          render: "Failed To Create",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };
  return (
    <Container>
      <Row>
        <Col lg={12} className="card-home-dboard mb-5">
          <div className="tbl_head_db">Create Employee</div>
          <div className="inp_node_athscreen">
            <input
              type="text"
              value={Employee.first_name}
              placeholder="First Name"
              onChange={(e) => {
                SetEmployee({ ...Employee, first_name: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Last Name</label>
          <div className="inp_node_athscreen">
            <input
              value={Employee.last_name}
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                SetEmployee({ ...Employee, last_name: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Phone</label>
          <div className="inp_node_athscreen">
            <input
              type="text"
              placeholder="Phone"
              value={Employee.phone}
              onChange={(e) => {
                SetEmployee({ ...Employee, phone: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Email</label>
          <div className="inp_node_athscreen">
            <input
              type="text"
              value={Employee.email}
              placeholder="Email"
              onChange={(e) => {
                SetEmployee({ ...Employee, email: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Password</label>
          <div className="inp_node_athscreen">
            <input
              type="text"
              value={Employee.password}
              placeholder="Password"
              onChange={(e) => {
                SetEmployee({ ...Employee, password: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Birth Date</label>
          <div className="inp_node_athscreen">
            <input
              type="date"
              value={Employee.birth_date}
              placeholder="Birth Date"
              onChange={(e) => {
                SetEmployee({ ...Employee, birth_date: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Hire Date</label>
          <div className="inp_node_athscreen">
            <input
              type="date"
              value={Employee.hire_date}
              placeholder="Hire Date"
              onChange={(e) => {
                SetEmployee({ ...Employee, hire_date: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Salery</label>
          <div className="inp_node_athscreen">
            <input
              type="text"
              value={Employee.salery}
              placeholder="Salery"
              onChange={(e) => {
                SetEmployee({ ...Employee, salery: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Position</label>
          <div className="inp_node_athscreen">
            <select
              value={Employee.position}
              className="inp_node_select"
              onChange={(e) => {
                SetEmployee({ ...Employee, position: e.target.value });
              }}
            >
              <option></option>
              <option>Developer</option>
              <option>Designer</option>
              <option>Project Manager</option>
              <option>Front Sales</option>
              <option>UpSeller</option>
              <option>Human Resource</option>
            </select>
          </div>
          <label className="label_inp_noed">Department</label>
          <div className="inp_node_athscreen">
            <select
              value={Employee.department}
              className="inp_node_select"
              onChange={(e) => {
                SetEmployee({ ...Employee, department: e.target.value });
              }}
            >
              <option></option>
              <option>Sales</option>
              <option>Production</option>
              <option>HR</option>
              <option>Project Management</option>
            </select>
          </div>
          <label className="label_inp_noed">Machine</label>
          <div className="inp_node_athscreen">
            <select
              value={Employee.machine}
              className="inp_node_select"
              onChange={(e) => {
                SetEmployee({ ...Employee, machine: e.target.value });
              }}
            >
              <option></option>
              <option>Laptop | HP - i5 8th Gen</option>
              <option>Laptop | HP - i5 6th Gen</option>
              <option>Laptop | Dell - i7 6th Gen, 16GB 250GB</option>
              <option>Laptop | Lenovo - i5 5th Gen, 08GB 250GB</option>
              <option>Laptop | Lenovo - i5 4th Gen, 08GB 250GB</option>
              <option>Laptop | Lenovo - i5 3rd Gen, 08GB 250GB </option>
              <option>Laptop | Lenovo - i5 3rd Gen</option>
              <option>Laptop | Lenovo - i5 2nd Gen</option>
            </select>
          </div>
          <label className="label_inp_noed">Working Hours</label>
          <div className="inp_node_athscreen">
            <input
              value={Employee.hours}
              type="number"
              placeholder="Hours"
              onChange={(e) => {
                SetEmployee({ ...Employee, hours: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Shift Start Time</label>
          <div className="inp_node_athscreen">
            <input
              value={Employee.shift_start}
              type="time"
              onChange={(e) => {
                SetEmployee({ ...Employee, shift_start: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Shift End Time</label>
          <div className="inp_node_athscreen">
            <input
              value={Employee.shift_end}
              type="time"
              onChange={(e) => {
                SetEmployee({ ...Employee, shift_end: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Relief Time</label>
          <div className="inp_node_athscreen">
            <input
              value={Employee.relief_time}
              type="number"
              placeholder="Enter Relief Time"
              onChange={(e) => {
                SetEmployee({ ...Employee, relief_time: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Address</label>
          <div className="inp_node_athscreen">
            <textarea
              className="inp_node_textarea"
              value={Employee.address}
              placeholder="Enter Address"
              onChange={(e) => {
                SetEmployee({ ...Employee, address: e.target.value });
              }}
            ></textarea>
          </div>
          <label className="label_inp_noed">Profile Image</label>
          <div className="inp_node_athscreen">
            <input
              type="file"
              disabled
              onChange={(e) => {
                SetEmployee({ ...Employee, profile: e.target.value });
              }}
              value={Employee.profile}
              placeholder="profile"
              alt="profile"
              title="Profile"
            />
          </div>
          <div className="headerloginbtn">
            <button
              className="ml-0 w-100 btn-pink"
              onClick={() => {
                addEmplyee();
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
export default CardFormCard;
