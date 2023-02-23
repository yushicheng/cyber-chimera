import React from "react";
import { Routes, Route } from "react-router-dom";

import BasicLayout from "@/source/layouts/basic_layouts";
import IndexPage from "@/source/pages/IndexPage";

import "@/source/global.less";

export default () => (
  <Routes>
    <Route path="/" element={(<BasicLayout />)}>
      <Route path="/" element={(<IndexPage />)} />
    </Route>
  </Routes>
);