import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";




const Main = () => {

  const {pathname} = useLocation() 

  useEffect(() => {
    window.scrollTo(0,0);
  },[pathname])


  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;