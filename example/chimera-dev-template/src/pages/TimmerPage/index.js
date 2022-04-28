import {useTranslation} from "react-i18next";
import React,{useRef,useState,useEffect,useCallback} from "react";

import css from "./style.less";

export default function TimmerPage(){
  const {t}=useTranslation();
  const timmer_token=useRef(null);
  const current_display=useRef(0);
  const [display,set_display]=useState(current_display.current);
  
  const handleTimmer=useCallback(()=>{
    timmer_token.current=setInterval(()=>{
      const current=current_display.current+1;
      set_display(current);
      current_display.current=current;
    },1000);
  },[]);

  const handlePaused=useCallback(()=>{
    clearInterval(timmer_token.current);
  },[]);

  const handlePlayed=useCallback(()=>{
    clearInterval(timmer_token.current);
    handleTimmer();
  },[handleTimmer]);

  useEffect(()=>{
    handleTimmer();
    return ()=>clearInterval(timmer_token.current);
  },[handleTimmer]);

  return (
    <div className={css.block}>
      <div>{t("当前定时为")}{display}(S)</div>
      <button type="button" onClick={handlePaused}>
        {t("暂停")}
      </button>
      <button type="button" onClick={handlePlayed}>
        {t("播放")}
      </button>
    </div>
)}