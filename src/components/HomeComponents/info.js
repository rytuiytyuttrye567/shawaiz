import Col from "react-bootstrap/Col";
import moment from "moment";

const Info = (Data, name) => {
  return (
    <Col lg={12} className="card-home-dboard">
      <div className="cheadsm_num">
        {name === true ? Data?.first_name + " Info" : "Your's Info"}
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Name</div>
        <div className="cheadsm_num walletlink_chain">
          {Data?.first_name + " " || " "}
          {Data?.last_name || " "}
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Email</div>
        <div className="cheadsm_num walletlink_chain">{Data?.email}</div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Phone</div>
        <div className="cheadsm_num walletlink_chain">{Data?.phone}</div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Birth Date</div>
        <div className="cheadsm_num walletlink_chain">
          {moment(Data?.birth_date).format("YYYY-MM-DD")}
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Hire Date</div>
        <div className="cheadsm_num walletlink_chain">
          {moment(Data?.hire_date).format("YYYY-MM-DD")}
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Salery</div>
        <div className="cheadsm_num walletlink_chain">{Data?.salery}</div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Department</div>
        <div className="cheadsm_num walletlink_chain">{Data?.department}</div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Position</div>
        <div className="cheadsm_num walletlink_chain">{Data?.position}</div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Hours</div>
        <div className="cheadsm_num walletlink_chain">{Data?.hours}</div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Relief Time</div>
        <div className="cheadsm_num walletlink_chain">
          {Data?.relief_time === undefined ? 0 : Data?.relief_time}
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Machine</div>
        <div className="cheadsm_num walletlink_chain">
          {Data?.machine === undefined ? "" : Data?.machine}
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="cheadsm_db">Address</div>
        <div className="cheadsm_num walletlink_chain">{Data?.address}</div>
      </div>
    </Col>
  );
};

export default Info;
