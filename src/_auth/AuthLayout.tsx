import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false; // Example authentication state

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" replace />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;
