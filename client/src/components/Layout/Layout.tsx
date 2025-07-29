import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-100">
      <Header />
      <Outlet/>
    </div>
  );
};

export default Layout;
