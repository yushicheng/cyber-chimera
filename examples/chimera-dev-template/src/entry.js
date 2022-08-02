import React from "react";
import { Routes, Route } from "react-router-dom";

import BasicLayout from "@/layouts/basic_layouts";
import IndexPage from "@/pages/IndexPage";

export default () => {
  return (
    <Routes>
      <Route path="/" element={(<BasicLayout />)}>
        <Route path="/" element={(<IndexPage />)} />
      </Route>
    </Routes>
  )
};