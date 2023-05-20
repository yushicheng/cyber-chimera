import React from "react";
import { Routes, Route } from "react-router-dom";

import BasicLayout from "@/application/layouts/basic_layouts";
import IndexPage from "@/application/pages/IndexPage";

import "@/application/global.less";

export function Application() {
  return (
    <Routes>
      <Route path="/" element={(<BasicLayout />)}>
        <Route path="/" element={(<IndexPage />)} />
      </Route>
    </Routes>
  )
};