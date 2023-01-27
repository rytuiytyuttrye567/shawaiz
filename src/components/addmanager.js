import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddManager = () => {
  const ManagerStruc = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    position: "",
    department: "",
    profile: "",
  };
  const [Manager, SetManager] = useState(ManagerStruc);
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const addManag = async () => {
    const notify = (mess) => toast(mess);
    if (!validateEmail(Manager.email)) {
      notify("Enter Valid Email");
      return false;
    }
    const id = toast.loading("Creating");
    await axios
      .post(process.env.REACT_APP_SERVERURL + "auth/create_manager", {
        ...Manager,
      })
      .then((response) => {
        response = response.data;
        if (response.success) {
          SetManager(ManagerStruc);
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
          <div className="tbl_head_db">Create Manager</div>
          <div className="inp_node_athscreen">
            <input
              type="text"
              value={Manager.first_name}
              placeholder="First Name"
              onChange={(e) => {
                SetManager({ ...Manager, first_name: e.target.value });
              }}
            />
          </div>
          <div className="inp_node_athscreen">
            <input
              value={Manager.last_name}
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                SetManager({ ...Manager, last_name: e.target.value });
              }}
            />
          </div>
          <div className="inp_node_athscreen">
            <input
              type="text"
              placeholder="Phone"
              value={Manager.phone}
              onChange={(e) => {
                SetManager({ ...Manager, phone: e.target.value });
              }}
            />
          </div>
          <div className="inp_node_athscreen">
            <input
              type="text"
              value={Manager.email}
              placeholder="Email"
              onChange={(e) => {
                SetManager({ ...Manager, email: e.target.value });
              }}
            />
          </div>
          <div className="inp_node_athscreen">
            <input
              type="text"
              value={Manager.password}
              placeholder="Password"
              onChange={(e) => {
                SetManager({ ...Manager, password: e.target.value });
              }}
            />
          </div>
          <label className="label_inp_noed">Position</label>
          <div className="inp_node_athscreen">
            <select
              value={Manager.position}
              className="inp_node_select"
              onChange={(e) => {
                SetManager({ ...Manager, position: e.target.value });
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
              value={Manager.department}
              className="inp_node_select"
              onChange={(e) => {
                SetManager({ ...Manager, department: e.target.value });
              }}
            >
              <option></option>
              <option>Sales</option>
              <option>Production</option>
              <option>HR</option>
              <option>Project Management</option>
            </select>
          </div>
          <label className="label_inp_noed">Profile Image</label>
          <div className="inp_node_athscreen">
            <input
              type="file"
              disabled
              readOnly
              onChange={(e) => {
                SetManager({ ...Manager, profile: e.target.value });
              }}
              value={Manager.profile}
              placeholder="profile"
              alt="profile"
              title="Profile"
            />
          </div>
          <div className="headerloginbtn">
            <button
              className="ml-0 w-100 btn-pink"
              onClick={() => {
                addManag();
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
export default AddManager;
