/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import { getWindow } from "ssr-window";
import { BrowserRouter } from "react-router-dom";

import { RenderContextProvider } from "@/application/context/render_context";
import { Application } from "@/application/application";

const window = getWindow();
const container = document.getElementById("root");

ReactDOM.hydrate((
  //@ts-ignore
  <RenderContextProvider initial_value={window.initial_value}>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </RenderContextProvider>
), container, () => {
  console.log(process.env.NODE_ENV);
});