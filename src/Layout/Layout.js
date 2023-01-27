import { ToastContainer } from "react-toastify";
import Header from "./Header/Header";
import MobileDetect from "mobile-detect";
import { useEffect, useState } from "react";
import Mobile from "../components/mobile";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {
  const [cookie, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  const [isMobile, SetisMobile] = useState(false);
  const [isVerify, SetisVerify] = useState(false);
  useEffect(() => {
    console.log(props);
    async function getData() {
      axios
        .get(process.env.REACT_APP_SERVERURL + "auth/verifyToken", {
          headers: { Authorization: `Bearer ${cookie?.token}` },
        })
        .then((response) => {
          response = response.data;
          if (response.success) {
            SetisVerify(true);
            window.localStorage.setItem(
              process.env.REACT_APP_NAME + "_user",
              JSON.stringify(response.user)
            );
          } else {
            console.log("Called")
            window.document.cookie = "token=; Max-Age=-99999999;";
            window.localStorage.removeItem(
              process.env.REACT_APP_NAME + "_user"
            );
            navigate("/login");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
          const id = toast.loading("");
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
            render: "Connection Failed",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        });
    }
    if (props.login_page === true || window.location.pathname === "/login") {
      SetisVerify(true);
      window.document.cookie = "token=; Max-Age=-99999999;";
    } else {
      getData();
    }
    var md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
      console.log("Mobile");
      SetisMobile(true);
    }
  }, []);
  return (
    <>
      {isMobile === true ? (
        <>
          <Mobile />
        </>
      ) : isVerify === true ? (
        <>
          <Header login={props.login} />
          {props.children}
          <ToastContainer />
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default Layout;
