/* eslint-disable react/prop-types */
import React from "react";
// import classnames from "classnames";
// import propTypes from "prop-types";

import css from "./style.scss";

import useResponsive from "@/application/hooks/useResponsive";

export default function ShowResponsive() {

  const { isDesktop, isTablet, isMobile } = useResponsive();

  return (
    <div className={css.show_responsive}>
      <div>{`${"是否为桌面"}:${isDesktop ? "是" : "否"}`}</div>
      <div>{`${"是否为平板"}:${isTablet ? "是" : "否"}`}</div>
      <div>{`${"是否为手机"}:${isMobile ? "是" : "否"}`}</div>
    </div>
  )
}


ShowResponsive.propTypes = {


};
ShowResponsive.defaultProps = {


};