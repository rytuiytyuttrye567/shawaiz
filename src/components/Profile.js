import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { GetUser as user } from "../auth/user";
import moment from "moment";

const Profile = () => {
  const Data = user();
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="card-home-dboard">
            <div className="tbl_head_db">Profile</div>
            <div className="d-flex justify-content-center flex-wrap">
              <div className="cheadsm_db myprofile_m">
                <img
                  src={`${
                    (Data?.profile === null || Data?.profile === "") &&
                    Data?.type === 0
                      ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgNDY5Ljc2Ij48cGF0aCBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMzkuNjQgMTkxLjI4YzMuMzQtOS4yOCA4LjQ0LTEyLjI5IDE1LjE2LTEyLjFsLTQuNDMtMi45NGMtMi40LTMwLjA1IDQuNjQtODIuMTgtMjcuOTktOTIuMDUgNjEuNzQtNzYuMyAxMzIuOS0xMTcuNzkgMTg2LjMzLTQ5LjkyIDY0LjM3IDMuMzggOTAuMTkgMTA1LjY3IDM4Ljg1IDE0OC43M2wtLjMgMi41NGMyLjAxLS42MSA0LjAyLTEgNS45NS0xLjE1IDMuNzktLjI5IDcuNDIuMzMgMTAuNTEgMS45NyAzLjM5IDEuODEgNS45OCA0Ljc0IDcuMzEgOC44OSAxLjI4IDMuOTcgMS4zMyA5LjA0LS4zNSAxNS4yN2wtOC4wMyAyMi43OGMtMS4zIDMuNy0yLjQ5IDYuMy01LjA4IDguMzYtMi42NyAyLjExLTUuOSAyLjktMTAuOSAyLjYzLS44My0uMDQtMS42Ni0uMTMtMi40Ny0uMjhhNTUuNjcgNTUuNjcgMCAwIDEtMy42OCAxNi4zMmMtMi43NyA3LjEyLTYuNjMgMTIuOTMtMTAuNDMgMTguMjktNC4zIDYuMDUtOC44NSAxMS41My0xMy42IDE2LjQ1IDMuNyAxMi45OSA4LjQ3IDIyLjU2IDE0LjE5IDI5Ljg0IDI5LjA0IDIwLjg4IDEwNy4yNSAyNS43OSAxMzQuNDggNDAuOTcgMzkuMzEgMjIgMzguMjMgNjQuNTIgNDYuODQgMTAzLjg4SDBjOC41My0zOS4wMSA3LjY1LTgyLjIzIDQ2Ljg0LTEwMy44OCAzNC41Mi0xOS4yMiAxMDcuNzctMTcuOTkgMTM2Ljk2LTQyLjkgNC4yLTYuNTggNy43NS0xNC40NiAxMC40Ny0yMy44Ni02LjIzLTYuNDgtMTIuMDctMTQuMTgtMTcuMzktMjMuMTJsLS4zNi0uNTdjLTQuOC04LjA2LTEwLjYtMTcuNzktMTIuNDItMzEuM2wtMS41Ni4wM2MtMy4yNy0uMDQtNi40Mi0uNzktOS4zNy0yLjQ2LTQuNzQtMi43LTguMDYtNy4zLTEwLjMtMTIuNDlsLS4yLS41MmMtMi41Mi02LjA5LTMuNjctMTMuMDMtMy45NC0xOC4yOC0uMS0xLjk2LS4xLTUuODUuMDEtOS41N3YtLjA1Yy4wOC0zLjE5LjI1LTYuMjguNDktOC4wMS4wOC0uNTMuMjEtMS4wMy40MS0xLjV6bTE4Mi45MyAxNDMuNjgtLjYzLS43NWMtNi4yMy03LjQ5LTExLjQ4LTE2Ljk1LTE1LjY0LTI5LjI4LTYuNzkgNS41NS0xNC40OCAxMC4yNi0yMi43NSAxMy43NmwtLjQzLjE5aC0uMDFjLTEwLjcyIDQuNjgtMjEuNzkgNi45NC0zMi43NiA2LjY5LTUuOTUtLjEzLTExLjg2LTEtMTcuNjctMi42MWwtLjIyLS4wNmMtOS41MS0yLjUzLTE4Ljk2LTcuMDktMjgtMTQuMDYtMy43MiAxMC43Mi04LjU1IDE5LjYtMTQuMiAyNi45M2wzMy45MiA4Mi44NCAxOS45My00NS45Ni05LjczLTEwLjYzYy03LjMxLTEwLjY5LTMuMDYtMjMuMSA4Ljc1LTI1LjAxIDUuMTYtLjgzIDI2LjA0LS45NSAzMC44Mi4zMyAxMC43IDIuODYgMTMuODkgMTQuOTcgNy42MiAyNC42OGwtOS43MyAxMC42MyAxOS43NiA0NS45NiAzMC45Ny04My42NXptLTExNy4zOC00Mi4xOS40LjM0YzE1LjM1IDE0LjY4IDMyLjM2IDIwLjIgNDguNTEgMTkuNTcgMTkuNDgtLjc3IDM3Ljg5LTEwLjM3IDUwLjg1LTIzLjY1LjQxLS40Mi44OC0uOCAxLjQxLTEuMDkgNC44LTQuODEgOS40MS0xMC4yOSAxMy43Ni0xNi40MSAzLjM0LTQuNzEgNi43Mi05Ljc4IDguOTktMTUuNjEgMi4yMS01LjY4IDMuNDctMTIuMzMgMi43OC0yMC41MS0uMDgtMS4zMi4yMy0yLjY4IDEuMDEtMy44NmE2LjExMiA2LjExMiAwIDAgMSA4LjQ2LTEuNzVjMS4wNy43IDIuMTYgMS4yOCAzLjI1IDEuNjguOTQuMzQgMS44NS41NSAyLjY4LjU5IDEuNzUuMDkgMi41NC4wOSAyLjY1IDAgLjE5LS4xNC41OC0xLjE5IDEuMTYtMi44NGw3Ljc5LTIyLjA2Yy45OS0zLjcyIDEuMDYtNi40LjQ5LTguMTgtLjI5LS45LS44LTEuNTEtMS40Mi0xLjg0LS45Mi0uNDktMi4yNy0uNjYtMy44NC0uNTQtMy40Mi4yNi03LjQyIDEuOTItMTAuOTcgNC42MS0xLjMuOTgtMi45OSAxLjQ1LTQuNzIgMS4xNS0zLjMzLS41Ny01LjU4LTMuNzQtNS4wMS03LjA3IDUuNzctMzMuNjcgMy4xMy01NS42MS00LjA0LTcwLjU3LTYuMjgtMTMuMTEtMTYuMy0yMS4wNS0yNy4xNy0yNi45OC0yNC4xMiAxOC40Ny00MS4xIDIwLjU4LTU4LjA0IDIyLjY3LTE0LjAxIDEuNzMtMjcuOTkgMy40Ni00Ni41MSAxNi4yNy04Ljc1IDYuMDUtMTQuNTggMTMuMzctMTcuNTkgMjEuODctMy4wOSA4LjczLTMuMzMgMTguODktLjgzIDMwLjQuMzIgMS4xNi4yOSAyLjQzLS4xNiAzLjY1LTEuMTQgMy4xNy00LjY2IDQuODEtNy44MyAzLjY3bC01LjYxLTIuMDNjLTcuMjQtMi41My0xMi4zNy0zLjcxLTE0LjM1Ljg0LS4xNiAxLjQ3LS4yNyAzLjcyLS4zMyA2LjA0di4wNWMtLjA5IDMuMzUtLjA5IDYuODUtLjAxIDguNjEuMjEgNC4xNSAxLjA4IDkuNTUgMi45NyAxNC4xM2wuMjIuNDVjMS4yNyAyLjk3IDIuOTYgNS40OSA1LjA2IDYuNjggMS4wNi42IDIuMjQuODggMy40OC44OSAxLjUyLjAyIDMuMjEtLjMgNS4wMS0uODMuNTctLjIgMS4xOC0uMzEgMS44Mi0uMzJhNi4xMTEgNi4xMTEgMCAwIDEgNi4yNiA1Ljk2Yy4zMyAxNC4xIDYuMzggMjQuMjQgMTEuMjUgMzIuNDFsLjM0LjU3YzUuNDQgOS4xNCAxMS40NCAxNi44MSAxNy44MyAyMy4wNHoiLz48L3N2Zz4="
                      : (Data?.profile === null || Data?.profile === "") &&
                        Data?.type === 1
                      ? "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuODggMTE0LjExIj48dGl0bGU+b2ZmaWNlLXdvcmtlcjwvdGl0bGU+PHBhdGggZD0iTTM0LjI0LDQzLjRjLjU5LTEuNjUsMS40Mi0yLjQ2LDIuNDgtMi43NS0uMzgtNy4yLjgtMTguNTItNi41Ni0yMC43NSwxNC42LTE4LDMxLjQyLTI3Ljg0LDQ0LjA1LTExLjhDODguNzIsOC44Niw5NC45NCwzMC44OSw4NSw0MS43NmE0LjQ3LDQuNDcsMCwwLDEsMi4yNS40NywzLjU1LDMuNTUsMCwwLDEsMS43MywyLjExQTYuMzgsNi4zOCwwLDAsMSw4OC44NSw0OEw4Nyw1My4zM2EzLjg4LDMuODgsMCwwLDEtMS4yMSwyLDMuNSwzLjUsMCwwLDEtMi41Ny42Myw0Ljc4LDQuNzgsMCwwLDEtLjUzLS4wNmMtLjEyLDYtMy4wNiw4Ljc2LTYuOSwxMi4zN2wtMS40NywxLjRjLTMuODksMy43NS04LjE0LDUuNTctMTIuNDYsNS41N1M1Myw3My4zMyw0OC45NCw2OS42OWwtMS40NS0xLjI1Yy0zLjc2LTMuMjQtNi45LTUuOTUtNy41LTEyLjU1aC0uMzRhNC42LDQuNiwwLDAsMS0yLjIxLS41OSw2LDYsMCwwLDEtMi40My0zLDEzLjU3LDEzLjU3LDAsMCwxLTEtNC40NGMwLS40NiwwLTEuMzgsMC0yLjI2cy4wNi0xLjQ5LjEyLTEuOTFhMS4zOSwxLjM5LDAsMCwxLC4wOS0uMzVaTTQ0LjgsNzUuMSw1NCw5OS4yOSw1OC42NCw4Ni4xbC0yLjI3LTIuNDhxLTEuNTMtMi4yNC0uNjgtMy45MmMxLjIzLTIuNDMsMy43Ny0yLDYuMTUtMnM1LjU3LS40Nyw2LjM1LDIuNjRhNC4xNSw0LjE1LDAsMCwxLS44LDMuMjZMNjUuMTIsODYuMWw0LjYzLDEzLjE5TDc4LjA4LDc1LjFjNiw1LjQxLDI3LjE4LDYuNSwzMy44LDEwLjE5QTE3LjUxLDE3LjUxLDAsMCwxLDExNy4zOSw5MGMzLjc5LDUsNC4xMSwxMi4wOSw1LjQ5LDE4LjIyLS4zNCwzLjU4LTIuMzcsNS42NC02LjM2LDUuOTRINi4zNmMtNC0uMy02LTIuMzctNi4zNi01Ljk0QzEuMzgsMTAyLDEuNzEsOTUsNS40OSw5MEExNy4xNSwxNy4xNSwwLDAsMSwxMSw4NS4yOWM4LjE0LTQuNTMsMjcuMTQtNC4xOSwzMy44LTEwLjE5Wk03Mi4yNiwyMS42Yy03LjM4LDcuNDktMTYuNjIsNS4xOC0yMy4xMyw4LjEzLS4zOC4yMy0uNzcuNDktMS4xNy43NmExMC41NiwxMC41NiwwLDAsMC00LjE4LDUuMjIsMTMuMTIsMTMuMTIsMCwwLDAtLjE3LDcuMTQsMS40OSwxLjQ5LDAsMCwxLDAsLjg2LDEuNDUsMS40NSwwLDAsMS0xLjg2Ljg3bC0uNDItLjE2LDAsLjIyLS43NC0uNDktLjE0LDBjLTEuNzItLjYtMi45My0uODgtMy4zOS4yLDAsLjM1LS4wNy44OC0uMDgsMS40NCwwLC43OSwwLDEuNjIsMCwyYTEwLjUzLDEwLjUzLDAsMCwwLC43NSwzLjQ1LDMuMjgsMy4yOCwwLDAsMCwxLjIsMS41OCwxLjc4LDEuNzgsMCwwLDAsLjgyLjIxLDQuMDUsNC4wNSwwLDAsMCwxLjE4LS4yLDEuNTYsMS41NiwwLDAsMSwuNDMtLjA4LDEuNDYsMS40NiwwLDAsMSwxLjQ4LDEuNDFjLjE2LDYuNTYsMy4wNyw5LjA2LDYuNjEsMTIuMTFsMS40NywxLjI4YzMuNTUsMy4xNiw3LjI5LDQuNzksMTEsNC43OVM2OSw3MC43Nyw3Mi4yNyw2Ny41NmMuNTMtLjUyLDEtMSwxLjUtMS40MiwzLjcxLTMuNDksNi40NC02LjA2LDUuOTItMTIuMzFhMS40NCwxLjQ0LDAsMCwxLDIuMjQtMS4zMyw0LjIsNC4yLDAsMCwwLC43Mi4zOGwwLDBhMi4xOCwyLjE4LDAsMCwwLC42My4xNEEyLjU0LDIuNTQsMCwwLDAsODQsNTNhMi45NCwyLjk0LDAsMCwwLC4yOC0uNjdsMS44NC01LjIyYTMuNTcsMy41NywwLDAsMCwuMTEtMS45My43LjcsMCwwLDAtLjMzLS40NCwxLjc4LDEuNzgsMCwwLDAtLjkxLS4xMiw1LjExLDUuMTEsMCwwLDAtMi41OSwxLjA5LDEuNDYsMS40NiwwLDAsMS0xLjEyLjI3LDEuNDUsMS40NSwwLDAsMS0xLjE4LTEuNjdjMS4zNi04LC43NC0xMy4xNS0xLTE2LjY4YTE0LjE5LDE0LjE5LDAsMCwwLTYuNDItNi4zOGwtLjQxLjMxWk01NywzNy4xMmMxLjQ1LjU0LDEuNzYsMS43Ni45NSwyLjIycy0yLjE3LS4yNi0zLjEtLjU2Yy0yLjQ0LS43OC01LjM0LS44Ny03LjQ0LjQ0YTExLjY4LDExLjY4LDAsMCwwLTEuNzEsMS4zNiw1Ljc4LDUuNzgsMCwwLDEsMS0yLjA5YzIuMTEtMi42Nyw3LjQzLTIuODIsMTAuMjYtMS4zN1ptOS4xOSwwYy0xLjQ1LjU0LTEuNzYsMS43Ni0xLDIuMjJzMi4xNy0uMjYsMy4xLS41NmMyLjQ0LS43OCw1LjMzLS44Nyw3LjQ0LjQ0YTExLjY4LDExLjY4LDAsMCwxLDEuNzEsMS4zNiw1Ljc4LDUuNzgsMCwwLDAtMS0yLjA5Yy0yLjExLTIuNjctNy40My0yLjgyLTEwLjI2LTEuMzdaTTQ5LjQsNDIuMzRhLjU5LjU5LDAsMCwxLS43Ny0uNDIuNzEuNzEsMCwwLDEsLjM4LS44NywxMCwxMCwwLDAsMSw3LjI2LDAsLjY5LjY5LDAsMCwxLC4zOS44NS41Ny41NywwLDAsMS0uNzQuNDRxLS42LS4yMS0xLjItLjM2YTEuNzQsMS43NCwwLDAsMSwuMDYuNDUsMS42OSwxLjY5LDAsMSwxLTMuMzcsMCwxLjY2LDEuNjYsMCwwLDEsLjEzLS42NCw4Ljc2LDguNzYsMCwwLDAtMi4xNC41NVptMTkuNTEtLjVhMS44NywxLjg3LDAsMCwwLS4xMS41OSwxLjY5LDEuNjksMCwxLDAsMy4zNywwLDEuNTYsMS41NiwwLDAsMC0uMTgtLjc0LDEwLjQxLDEwLjQxLDAsMCwxLDIuMjIuNDkuNTkuNTksMCwwLDAsLjc0LS40Ny43MS43MSwwLDAsMC0uNDEtLjg1LDExLjgzLDExLjgzLDAsMCwwLTMuNjMtLjU5LDExLjEzLDExLjEzLDAsMCwwLTMuNTkuNi43MS43MSwwLDAsMC0uNDEuODUuNi42LDAsMCwwLC43NC40NiwxMC4yNywxMC4yNywwLDAsMSwxLjI2LS4zNFptLTkuNiwxNC41OWEuOTQuOTQsMCwwLDEtLjEyLTEuMzFBLjkzLjkzLDAsMCwxLDYwLjUsNTVhMi4xLDIuMSwwLDAsMCwxLjMzLjU5LDIuMTYsMi4xNiwwLDAsMCwxLjM5LS42LjkxLjkxLDAsMCwxLDEuMjkuMTIuOTIuOTIsMCwwLDEtLjEyLDEuMyw0LDQsMCwwLDEtMi41OSwxLDMuNzksMy43OSwwLDAsMS0yLjQ5LTFabS0yLjg5LDYuNzVhMSwxLDAsMCwxLS40LTEuMzEsMSwxLDAsMCwxLDEuMzEtLjQsOS4zNCw5LjM0LDAsMCwwLDQuNDIsMS4yLDksOSwwLDAsMCw0LjM2LTEuMTksMSwxLDAsMSwxLC45NCwxLjcsMTAuNjQsMTAuNjQsMCwwLDEtNS4yOSwxLjQzLDExLjUsMTEuNSwwLDAsMS01LjM0LTEuNDNaIi8+PC9zdmc+"
                      : Data?.profile
                  }`}
                  alt="Profile"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="cheadsm_db">Name</div>
              <div className="cheadsm_num walletlink_chain">
                <Link to="https://bscscan.com">
                  {Data?.first_name + " " || " "}
                  {Data?.last_name || " "}
                </Link>
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
            {Data?.type === 0 ? (
              <>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="cheadsm_db">Birth Date</div>
                  <div className="cheadsm_num walletlink_chain">
                    {moment(Data?.birth_date).format("DD-MM-YY")}
                  </div>
                </div>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="cheadsm_db">Hire Date</div>
                  <div className="cheadsm_num walletlink_chain">
                    {moment(Data?.hire_date).format("DD-MM-YY")}
                  </div>
                </div>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="cheadsm_db">Salery</div>
                  <div className="cheadsm_num walletlink_chain">
                    {Data?.salery}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-between flex-wrap">
              <div className="cheadsm_db">Department</div>
              <div className="cheadsm_num walletlink_chain">
                {Data?.department}
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="cheadsm_db">Position</div>
              <div className="cheadsm_num walletlink_chain">
                {Data?.position}
              </div>
            </div>
            {Data?.type === 0 ? (
              <>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="cheadsm_db">Hours</div>
                  <div className="cheadsm_num walletlink_chain">
                    {Data?.hours}
                  </div>
                </div>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="cheadsm_db">Address</div>
                  <div className="cheadsm_num walletlink_chain">
                    {Data?.address}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Profile;
