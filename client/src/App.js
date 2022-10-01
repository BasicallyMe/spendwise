import React, { useEffect, useState } from "react";
import { Navigation } from "./components";
import useBearStore from "./core/useStore";

const App = () => {
  async function getUserData() {
    try {
      let response = await fetch("/user/data", {
        method: "GET",
        credentials: "include",
      });
      response = await response.json();
      console.log(response);
    } catch (err) {
      console.log(err);
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
      <div className="section"></div>
    </div>
  );
};

export default App;
