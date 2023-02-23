import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import init18n from "@/source/init18n";
import MainBlock from "@/source/entry";
// import NoSSR from "@/source/components/NoSSR";
import { RenderContextProvider } from "@/source/context/render_context";

(async () => {
  const { initial_value } = window;
  ReactDOM.hydrate((
    <I18nextProvider i18n={init18n(window.language)}>
      <BrowserRouter basename={window.basename}>
        <RenderContextProvider initial_value={initial_value}>
          <MainBlock />
        </RenderContextProvider>
      </BrowserRouter>
    </I18nextProvider>
  ), document.getElementById("root"));
})();


