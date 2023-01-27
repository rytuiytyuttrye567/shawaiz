import Layout from "../Layout/Layout";
import Login from "../components/Login";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const notify = (mess) => toast(mess);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const HandleSignin = async (account) => {
    if (account.email === "" || account.password === "") {
      notify(
        account.email === "" ? "Email Is Required" : "Password Is Required"
      );
      return false;
    }
    if (account.type === undefined) {
      notify("Select Checkbox Who You Are .");
      return false;
    }
    if (!validateEmail(account.email)) {
      notify("Enter Valid Email");
      return false;
    }
    const id = toast.loading("logging");
    await axios
      .post(process.env.REACT_APP_SERVERURL + "auth/login", {
        ...account,
        id: account.username,
      })
      .then((response) => {
        response = response.data;
        if (response.success) {
          setCookie("token", response.token);
          window.localStorage.setItem(
            process.env.REACT_APP_NAME + "_user",
            JSON.stringify(response.user)
          );
          navigate("/");
          toast.update(id, {
            render: "Successfully LogedIn",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast.update(id, {
            render: response.message,
            type: "info",
            isLoading: false,
            pauseOnHover: true,
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
          render: "Failed To Login",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };
  return (
    <>
      <Layout login_page={true}>
        <Login HandleSignin={HandleSignin} />
      </Layout>
    </>
  );
}

export default Signin;
