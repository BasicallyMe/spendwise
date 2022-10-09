import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigation } from "./components";
import './App.css';

const App = () => {
  const navigate = useNavigate();
  async function getUserData() {
    let status = null;
    try {
      const res = await fetch("http://localhost:5000/user/data", {
        method: "GET",
        credentials: "include",
      });
      status = await res.status;
      const response = await res.json();
      console.log(response, status);
    } catch (err) {
      console.log(err);
    }
    if (status === 403 || status === 401) {
      navigate("/signin", { replace: true });
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="section">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
