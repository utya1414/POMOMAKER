import React from "react";
import { AppLogo, Footer, Sidebar } from "@/lib/components/layouts";
const layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <div className="my-4 text-4xl font-sans flex justify-center items-center">
        <AppLogo />
      </div>
      <div className="flex w-full flex-grow">
        <Sidebar />
        <main className="flex w-full flex-grow">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default layout;
