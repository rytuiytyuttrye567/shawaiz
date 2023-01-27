import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { GetUser as user } from "./auth/user";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import RoutesLogin from "./routes/LoginRoutes";
import RoutesEmployee from "./routes/Employee";
import RoutesAdmin from "./routes/Admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
const data = user();

root.render(
  <BrowserRouter>
    {data?.type === 0 ? (
      <RoutesEmployee />
    ) : data?.type === 1 ? (
      <RoutesAdmin />
    ) : (
      <RoutesLogin />
    )}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
