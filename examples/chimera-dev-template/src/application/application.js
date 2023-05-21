import React from "react";
import { Routes, Route } from "react-router-dom";

import BasicLayout from "@/application/layouts/basic_layouts";
import IndexPage from "@/application/pages/IndexPage";
import TestPage from "@/application/pages/TestPage";

import "@/application/global.less";

export function Application() {
  return (
    <Routes>
      <Route path="/" element={(<BasicLayout />)}>
        <Route path="/" element={(<IndexPage />)} />
        <Route path="/test" element={(<TestPage />)} />
      </Route>
    </Routes>
  )
};