import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react";


const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen flex-col bg-slate-950">
          <p className="logo1 !text-5xl mb-10">Learnify</p>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
}

export default Layout