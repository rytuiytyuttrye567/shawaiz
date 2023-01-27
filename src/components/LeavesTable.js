import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LeavePopup from "./popups/LeavePopup";
import { useCookies } from "react-cookie";

const LeavesTable = () => {
  const [Leaves, SetLeaves] = useState([]);
  const [Popup, SetPopup] = useState();
  const [cookie] = useCookies(["DigiBytes"]);

  useEffect(() => {
    async function getData() {
      axios
        .get(process.env.REACT_APP_SERVERURL + "auth/leaves", {
          headers: { Authorization: `Bearer ${cookie?.token}` },
        })
        .then((response) => {
          response = response.data;
          if (response.success) {
            SetLeaves(response.Data);
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
            render: "Failed To Load Leaves",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        });
    }
    getData();
  }, []);
  async function approveLeave(_id, index) {
    const id = toast.loading("approving ...");
    await axios
      .post(
        process.env.REACT_APP_SERVERURL + "auth/approve_leave/" + _id,
        {},
        { headers: { Authorization: `Bearer ${cookie?.token}` } }
      )
      .then((response) => {
        response = response.data;
        if (response.success) {
          Leaves.splice(index, 1);
          SetLeaves([...Leaves]);
          toast.update(id, {
            render: "Successfully Approved",
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
          render: "Failed To Approve Leave",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }
  async function deleteLeave(_id, index) {
    const id = toast.loading("Rejecting ...");
    await axios
      .post(
        process.env.REACT_APP_SERVERURL + "auth/delete_leave/" + _id,
        {},
        { headers: { Authorization: `Bearer ${cookie?.token}` } }
      )
      .then((response) => {
        response = response.data;
        if (response.success) {
          Leaves.splice(index, 1);
          SetLeaves([...Leaves]);
          toast.update(id, {
            render: "Successfully Rejected",
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
          render: "Failed To Reject Leave",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="card-home-dboard">
            <div className="tbl_head_db">Total Leaves ({Leaves.length})</div>
            <Table hover id="table_employees">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Leaves.map((v, i) => {
                  return (
                    <tr key={v._id}>
                      <td>
                        {v.employee.first_name} {v.employee.last_name}
                      </td>
                      <td>{v.employee.phone}</td>
                      <td>{v.leave_type}</td>
                      <td>{v.from}</td>
                      <td>{v.to}</td>
                      <td className="btns_table_trxn">
                        <button
                          title="View Leave Detail's"
                          onClick={() => {
                            SetPopup(
                              <LeavePopup
                                Data={{
                                  ...v.employee,
                                  status: v.status,
                                  reason: v.reason,
                                  from: v.from,
                                  to: v.to,
                                  type: v.leave_type,
                                }}
                                SetPopup={SetPopup}
                              />
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
                        <button
                          title="Approve Leave"
                          onClick={() => {
                            approveLeave(v._id, i);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height={24}
                            width={24}
                            shape-rendering="geometricPrecision"
                            text-rendering="geometricPrecision"
                            image-rendering="optimizeQuality"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            viewBox="0 0 419 511.68"
                          >
                            <path d="M314.98 303.63c57.47 0 104.02 46.58 104.02 104.02 0 57.47-46.58 104.03-104.02 104.03-57.47 0-104.03-46.58-104.03-104.03 0-57.47 46.59-104.02 104.03-104.02zM93 39.4h46.13C141.83 17.18 159.77 0 181.52 0c21.62 0 39.45 16.95 42.34 38.94l46.76.46c2.61 0 4.7 2.1 4.7 4.71v51.85c0 2.6-2.09 4.7-4.7 4.7H93.05c-2.56 0-4.71-2.1-4.71-4.7V44.11C88.3 41.5 90.4 39.4 93 39.4zM41.72 59.28h23.94v24.38H41.72c-4.76 0-9.11 1.95-12.24 5.09-3.14 3.13-5.1 7.48-5.1 12.24v315.53c0 4.76 1.96 9.1 5.1 12.24 3.12 3.16 7.47 5.12 12.24 5.12h142.62c1.68 8.44 4.18 16.6 7.37 24.38H41.72c-11.4 0-21.85-4.72-29.44-12.3C4.72 438.44 0 428 0 416.52V100.99c0-11.48 4.7-21.92 12.25-29.47 7.55-7.55 18-12.24 29.47-12.24zm297.56 217.36V100.99c0-4.52-1.76-8.67-4.61-11.75l-.51-.48c-3.15-3.14-7.48-5.1-12.24-5.1h-23.91V59.28h23.91c11.48 0 21.92 4.71 29.46 12.26l.72.78c7.15 7.51 11.56 17.64 11.56 28.67V283.6c-7.8-3.06-15.95-5.41-24.38-6.96zm-206.75-8.06c-7.13 0-12.92-5.79-12.92-12.93 0-7.13 5.79-12.92 12.92-12.92h142.82c7.14 0 12.93 5.79 12.93 12.92 0 7.14-5.79 12.93-12.93 12.93H132.53zM89.5 241.22c7.98 0 14.43 6.46 14.43 14.44 0 7.98-6.45 14.44-14.43 14.44-7.98 0-14.44-6.46-14.44-14.44 0-7.98 6.46-14.44 14.44-14.44zm0 78.62c7.98 0 14.43 6.47 14.43 14.44s-6.45 14.44-14.43 14.44c-7.98 0-14.44-6.47-14.44-14.44s6.46-14.44 14.44-14.44zm43.04 27.36c-7.13 0-12.93-5.79-12.93-12.93 0-7.13 5.8-12.92 12.93-12.92h80.96a133.654 133.654 0 0 0-17.27 25.85h-63.69zM89.5 162.61c7.98 0 14.43 6.46 14.43 14.44 0 7.98-6.45 14.44-14.43 14.44-7.98 0-14.44-6.46-14.44-14.44 0-7.98 6.46-14.44 14.44-14.44zm43.03 27.36c-7.13 0-12.92-5.8-12.92-12.93s5.79-12.93 12.92-12.93h142.82c7.14 0 12.93 5.8 12.93 12.93s-5.79 12.93-12.93 12.93H132.53zm48.5-169.81c12.3 0 22.26 9.97 22.26 22.27 0 12.29-9.96 22.26-22.26 22.26s-22.27-9.97-22.27-22.26c0-12.3 9.97-22.27 22.27-22.27zm103.62 367.48 19.48 18.45 38.62-39.2c3.6-3.67 5.85-6.59 10.31-2.03l14.42 14.76c4.73 4.67 4.48 7.4.02 11.78l-55.16 54.19c-9.39 9.23-7.77 9.81-17.3.32l-34.68-34.48c-1.96-2.15-1.75-4.33.39-6.5l16.73-17.32c2.54-2.64 4.56-2.47 7.17.03z" />
                          </svg>
                        </button>
                        <button
                          title="Delete Leave"
                          onClick={() => {
                            deleteLeave(v._id, i);
                          }}
                        >
                          <svg
                            id="Layer_1"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 122.88 120.79"
                          >
                            <title>Reject Leave</title>
                            <path d="M31.4,21.63H92.08V7.68a.54.54,0,0,0,0-.22.64.64,0,0,0-.13-.19l0,0a.64.64,0,0,0-.19-.13.59.59,0,0,0-.23,0H7.68a.51.51,0,0,0-.22,0,.85.85,0,0,0-.21.14l0,0a.78.78,0,0,0-.11.18.54.54,0,0,0,0,.22v83.8a.54.54,0,0,0,0,.22v0a.94.94,0,0,0,.12.18.74.74,0,0,0,.21.13h0a.64.64,0,0,0,.2,0H23.73V29.31A7.66,7.66,0,0,1,26,23.88l0,0a7.6,7.6,0,0,1,2.46-1.63,7.68,7.68,0,0,1,2.92-.58ZM84.07,53.07a5.14,5.14,0,1,1,7.27,7.27l-10.8,10.8,10.8,10.79a5.14,5.14,0,0,1-7.27,7.28l-10.8-10.8L62.48,89.21a5.14,5.14,0,0,1-7.27-7.28L66,71.14,55.21,60.34a5.14,5.14,0,1,1,7.27-7.27l10.79,10.8,10.8-10.8ZM99.15,21.63h16a7.77,7.77,0,0,1,2.93.58,7.89,7.89,0,0,1,2.5,1.67l0,0a7.68,7.68,0,0,1,2.22,5.39v83.8a7.69,7.69,0,0,1-4.75,7.09,7.59,7.59,0,0,1-2.93.59H31.4a7.5,7.5,0,0,1-2.92-.59A7.7,7.7,0,0,1,24.31,116a7.5,7.5,0,0,1-.58-2.92v-14h-16a7.59,7.59,0,0,1-2.93-.59A7.66,7.66,0,0,1,0,91.48V7.68A7.77,7.77,0,0,1,.58,4.75a7.89,7.89,0,0,1,1.67-2.5A7.86,7.86,0,0,1,4.75.59,7.59,7.59,0,0,1,7.68,0H91.47A7.69,7.69,0,0,1,94.4.58a8.06,8.06,0,0,1,2.5,1.67,7.69,7.69,0,0,1,2.25,5.43v14Zm16,7.07H31.4a.5.5,0,0,0-.21.05.6.6,0,0,0-.21.14h0a.86.86,0,0,0-.13.2.51.51,0,0,0,0,.22v83.8a.54.54,0,0,0,0,.22.66.66,0,0,0,.14.2l0,0a.71.71,0,0,0,.18.12.85.85,0,0,0,.22,0h83.8a.78.78,0,0,0,.22,0h0a.75.75,0,0,0,.18-.13.8.8,0,0,0,.13-.19v0a.64.64,0,0,0,0-.2V29.31a.54.54,0,0,0,0-.22v0a.66.66,0,0,0-.12-.17.85.85,0,0,0-.21-.14.54.54,0,0,0-.22-.05Z" />
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
export default LeavesTable;
