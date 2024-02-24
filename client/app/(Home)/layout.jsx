import React from "react";
import Sidebar from "@/lib/components/layouts/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full flex-grow">
      <Sidebar />
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
