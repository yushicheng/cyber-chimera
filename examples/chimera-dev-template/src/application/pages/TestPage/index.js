/* eslint-disable react/prop-types */
import React from "react";
import { Space, Button } from "antd";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

export default function TestPage() {
  return (
    <Space>
      <Button type="default">测试功能001</Button>
      <Button type="primary">测试功能002</Button>
    </Space>
  )
};


TestPage.propTypes = {

};

TestPage.defaultProps = {

};