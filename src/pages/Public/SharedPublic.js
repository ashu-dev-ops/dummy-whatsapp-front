import React from "react";
import DrawerAppBar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import StickyFooter from "../../components/Footer";

export default function SharedPublic() {
  return (
    <div>
      <DrawerAppBar />
      <Outlet />
      <StickyFooter />
    </div>
  );
}
