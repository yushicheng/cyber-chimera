/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
// import {Outlet,Navigate,useLocation} from "react-router-dom";

import useInitalValue from "@/hooks/useInitalValue";
import ShowResponsive from "@/components/ShowResponsive";

import css from "./style.less";
import image from "./v2-5c21be97780f6be9aeb5bb2d01ae2470_r.jpg";


// import classnames from "classnames";
// import propTypes from "prop-types";

export default function IndexPage() {
  const { t } = useTranslation();

  const initial_value = useInitalValue()

  // const {pathname}=useLocation();

  const handleChangeChinese = useCallback(() => {
    window.location.pathname = "zh";
  }, []);

  const handleChangeEnglish = useCallback(() => {
    window.location.pathname = "en";
  }, []);

  return (
    <div>
      <img className={css.image} src={image} alt="" />
      <div>{t("多语言切换测试")}</div>
      <pre>页面注水信息:{JSON.stringify(initial_value, null, " ")}</pre>
      <div>asdassadas</div>
      <button type="button" onClick={handleChangeChinese}>{t("Chinese")}</button>
      <button type="button" onClick={handleChangeEnglish}>{t("English")}</button>
      <Outlet />
      <ShowResponsive />
    </div>
  )
}


IndexPage.propTypes = {


};
IndexPage.defaultProps = {


};