/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Application } from "@/application/application";

const container = document.getElementById("root");

ReactDOM.render((
  <BrowserRouter>
    <Application />
  </BrowserRouter>
), container, () => {
  console.log(process.env.NODE_ENV);
});