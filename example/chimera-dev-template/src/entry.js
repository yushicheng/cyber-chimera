import React from "react";
import {Routes,Route} from "react-router-dom";

import IndexPage from "@/pages/IndexPage";
import TimmerPage from "@/pages/TimmerPage";
import RequestPage from "@/pages/RequestPage";


export default ()=>{
  return (
    <Routes>
      <Route path="/" element={(<IndexPage />)}>
        <Route path="/time_page" element={(<TimmerPage />)} />
        <Route path="/request_test" element={(<RequestPage />)} />
      </Route>
    </Routes>
)};