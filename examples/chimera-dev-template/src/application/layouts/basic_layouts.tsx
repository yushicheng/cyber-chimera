/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Space } from "antd";
import { NavLink, Outlet } from "react-router-dom";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
import css from "./style.module.less";


export default function BasicLayout(props) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={css.menu}>
        <Space direction="horizontal">
          <NavLink reloadDocument to="/">主页</NavLink>
          <NavLink reloadDocument to="/test">测试页面</NavLink>
        </Space>
      </div>
      <Outlet />
    </div>
  )
};


BasicLayout.propTypes = {


};
BasicLayout.defaultProps = {


};