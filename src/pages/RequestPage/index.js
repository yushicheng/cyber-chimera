/* eslint-disable react/prop-types */
import axios from "axios";
import React,{useCallback} from "react";
// import classnames from "classnames";
// import propTypes from "prop-types";

// import css from "./style.scss";

export default function RequestPage(){
  
  const handleClick=useCallback(async ()=>{
    const {data}=await axios.get("/api/hello_words");
    console.log(data);
  },[]);

  return (
    <div>
      <button type="button" onClick={handleClick}>测试代理</button>
    </div>
)}


RequestPage.propTypes={


};
RequestPage.defaultProps={


};