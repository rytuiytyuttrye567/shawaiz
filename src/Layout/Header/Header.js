import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { GetUser as user, Logout } from "../../auth/user";
import { useNavigate } from "react-router-dom";

const HeaderLoginBtns = () => {
  return (
    <>
      <div className="d-flex headerloginbtn">
        <Link to="/signin">
          <button className="btn-pink">Sign In</button>
        </Link>
      </div>
    </>
  );
};

const HeaderBtns = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex headerloginbtn">
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        <button
          className="btn-pink"
          onClick={() => {
            navigate("/signin");
            Logout();
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

const Header = (props) => {
  const Data = user();
  return (
    <>
      <Navbar className="headerbar" fixed="sticky" expand="lg">
        <Container>
          <Container fluid className="cfluid-flex-lg">
            <div className="d-flex justify-content-between align-items-center">
              <Navbar.Brand>
                <Link to="/">
                  <img
                    src="https://digibytes.pk/demo/wp-content/uploads/2022/10/cropped-Digibytes-01.png"
                    alt=""
                    className="headerbarlogo"
                  />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.46666" cy="10.5333" r="2" fill="black" />
                  <circle cx="9.46666" cy="22.5333" r="2" fill="black" />
                  <circle cx="22.2667" cy="10.5333" r="2" fill="black" />
                  <circle cx="22.2667" cy="22.5333" r="2" fill="black" />
                </svg>
              </Navbar.Toggle>
            </div>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                {Data === undefined ? (
                  <HeaderLoginBtns />
                ) : Data === null ? (
                  <HeaderLoginBtns />
                ) : (
                  <HeaderBtns />
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
