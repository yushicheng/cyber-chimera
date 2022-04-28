import React from "react";
import {Routes,Route} from "react-router-dom";

import IndexPage from "@/pages/IndexPage";


export default ()=>{
  return (
    <Routes>
      <Route path="/" element={(<IndexPage />)}/>
    </Routes>
)};