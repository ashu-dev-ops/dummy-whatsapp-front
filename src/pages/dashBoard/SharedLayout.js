import React from "react";
import NavbarDashBoard from "../../components/NavbarDashBoard";
import { Outlet } from "react-router-dom";

export default function SharedDashBoard() {
  return (
    <div>
      <NavbarDashBoard />
      <Outlet />
    </div>
  );
}
