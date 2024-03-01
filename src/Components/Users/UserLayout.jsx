import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UserNav from './UserNav';

const UserLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
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
          <UserNav />
          <Outlet />
        </>
      )}
    </>
  );
};

export default UserLayout;
