import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      { !isOwnerPath && <Navbar /> }
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
