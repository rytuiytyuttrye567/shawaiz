import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import lateicon from "../icons/iconlate.svg";
import MapPopup from "./popups/mappopup";
import momenttz from "moment-timezone";

const TableCard = (props) => {
  const [cookie] = useCookies(["DigiBytes"]);
  const [Month, SetMonth] = useState(momenttz()
  .tz("Asia/Karachi")
  .format("MM"));
  const [userID, SetuserID] = useState(
    props.userID === undefined ? "current" : props.userID
  );
  const [Year, SetYear] = useState(new Date().getFullYear());
  const [Popup, SetPopup] = useState();
  const [Data, SetData] = useState([]);
  async function getData(m, y) {
    axios
      .get(
        process.env.REACT_APP_SERVERURL +
          "auth/attendence/" +
          m +
          "/" +
          y +
          "/" +
          userID,
        {
          headers: { Authorization: `Bearer ${cookie?.token}` },
        }
      )
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
          render: "Failed To Load Attendence",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }
  useEffect(() => {
    momenttz.updateLocale("en", {
      invalidDate: String,
    });
    getData(Month, Year);
  }, []);
  function load_record(e) {
    SetMonth(e.target.value);
    getData(e.target.value, Year);
  }
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="card-home-dboard">
            <div className="tbl_head_db">Filter</div>
            <div className="inp_node_athscreen">
              <select
                className="inp_node_select"
                value={Month}
                onChange={(r) => {
                  load_record(r);
                }}
              >
                <option value={`01`}>January</option>
                <option value={`02`}>February</option>
                <option value={`03`}>March</option>
                <option value={`04`}>April</option>
                <option value={`05`}>May</option>
                <option value={`06`}>June</option>
                <option value={`07`}>July</option>
                <option value={`08`}>August</option>
                <option value={`09`}>September</option>
                <option value={`10`}>Octuber</option>
                <option value={`11`}>November</option>
                <option value={`12`}>December</option>
              </select>
            </div>
          </Col>
          <Col lg={12} className="card-home-dboard">
            <div className="tbl_head_db">Monthly Attendence Record</div>
            <Table hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((v, i) => {
                  return (
                    <tr
                      key={i}
                      className={`${
                        v?.day === "Saturday" || v?.day === "Sunday"
                          ? "weekend-day-class"
                          : v?.Leave?.status !== undefined &&
                            v?.Leave?.status !== "" &&
                            v?.Leave?.status === "approved"
                          ? " on_leave-class"
                          : ""
                      } ${
                        v?.Data?.in_time !== undefined &&
                        v?.Data?.in_time !== ""
                          ? "day-success-class"
                          : "day-fail-class"
                      }`}
                    >
                      <td>{v?.date}</td>
                      <td>{v?.day}</td>
                      <td
                        className={`${v?.late === true ? "" : "tindent_tenpk"}`}
                      >
                        {v?.late === true ? (
                          <img src={lateicon} className="late_icon" alt="" />
                        ) : (
                          ""
                        )}
                        {momenttz(v?.Data?.in_time, "YYYY-MM-DD HH:mm:ss")
                          .tz("Asia/Karachi")
                          .format("hh:mm:ss")}
                      </td>
                      <td>
                        {momenttz(v?.Data?.out_time, "YYYY-MM-DD HH:mm:ss")
                          .tz("Asia/Karachi")
                          .format("hh:mm:ss")}
                      </td>
                      <td>
                        <p className="tbl_laebl success-tbl">
                          {v?.day === "Saturday" || v?.day === "Sunday"
                            ? "Weekend"
                            : v?.Data?.status !== undefined &&
                              v?.Data?.status !== ""
                            ? v?.Data?.status
                            : v?.Leave?.status !== undefined &&
                              v?.Leave?.status !== "" &&
                              v?.Leave?.status === "approved"
                            ? " Leave "
                            : ""}
                        </p>
                      </td>
                      <td className="btns_table_trxn">
                        {v?.Data?.location?.geometry?.lat &&
                        v?.Data?.location?.geometry?.lat !== undefined ? (
                          <button
                            onClick={() => {
                              SetPopup(
                                <MapPopup
                                  response={[
                                    {
                                      ...v?.Data?.location,
                                      geometry: v?.Data?.location?.geometry,
                                      formatted: v?.Data?.location?.formatted,
                                    },
                                  ]}
                                  Data={v}
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
                        ) : (
                          ""
                        )}
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
export default TableCard;
