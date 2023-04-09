/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import useInitalValue from "@/hooks/useInitalValue";
import ShowResponsive from "@/components/ShowResponsive";

import css from "./style.less";
import image from "./v2-5c21be97780f6be9aeb5bb2d01ae2470_r.jpg";

// import classnames from "classnames";
// import propTypes from "prop-types";

export default function IndexPage() {

  const initial_value = useInitalValue()

  const { pathname } = useLocation();


  useEffect(() => {
    console.log("process.env.RUNTIME_CONFIG", process.env.RUNTIME_CONFIG);
    console.log("pathname", pathname);
  }, [pathname]);

  return (
    <div>
      <img className={css.image} src={image} alt="" />
      <pre>页面注水信息:{JSON.stringify(initial_value, null, " ")}</pre>
      <Outlet />
      <ShowResponsive />
    </div>
  )
}


IndexPage.propTypes = {


};
IndexPage.defaultProps = {


};