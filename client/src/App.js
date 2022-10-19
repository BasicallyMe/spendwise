import React from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { Navigation } from "./components";
import './App.css';
import { checkRegistered, checkLoggedIn } from "./core/container";

// ➡ Loader function to redirect based on state
export async function loader() {
  if (!checkRegistered()) {
    return redirect("/register");
  }
  if (!checkLoggedIn()) {
    return redirect("/signin");
  }
}

const App = () => {
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
