import React, { useEffect, useState } from "react";
import { Navigation } from "./components";
import { Navigate } from "react-router-dom";
import { checkLoggedIn, checkRegistered } from "./core/container";
import useBearStore from "./core/useStore";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { loggedIn, userRegistered } = useBearStore();

  async function getUserData() {
    try {
      let response = await fetch("http://localhost:5000/user/data", {
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
      {/* {checkRegistered() ? (
        checkLoggedIn() ? null : (
          <Navigate to="/signin" replace={true} />
        )
      ) : (
        <Navigate to="/register" replace={true} />
      )} */}
      <div className="navigation">
        <Navigation />
      </div>
      <div className="section"></div>
    </div>
  );
};

export default App;
