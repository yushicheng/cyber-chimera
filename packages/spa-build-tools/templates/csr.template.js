import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import MainBlock from "@/entry";

(async () => {
  ReactDOM.hydrate((
    <BrowserRouter basename={window.basename}>
      <MainBlock />
    </BrowserRouter>
  ), document.getElementById("root"));
})();


