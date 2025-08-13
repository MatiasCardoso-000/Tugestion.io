import React, { useState } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Aside from "../Aside/Aside";

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`min-h-screen  bg-white md:grid  ${menuOpen ? 'grid-cols-[300px_1fr]' : 'grid-cols-[0_1fr]'} w-full transition-all duration-300`}>
        <Aside menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="w-full  flex flex-col gap-4">
        <Header toggleMenu={toggleMenu} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
