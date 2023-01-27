import { useState } from "react";
function GetUser() {
  let data = window.localStorage.getItem(process.env.REACT_APP_NAME + "_user");
  data = data === undefined ? undefined : data === "" ? undefined : JSON.parse(data);
  return data;
}
const IsLogin = () => {
  const [Login, SetIsLogin] = useState();
};
function Logout() {
  window.localStorage.removeItem(process.env.REACT_APP_NAME + "_user");
  window.location.reload();
}
export { GetUser, Logout, IsLogin };
