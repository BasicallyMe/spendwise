import React, { useEffect, useState } from "react";
import {
  Navigation,
} from "./components";
import { Navigate } from "react-router-dom";

const App = () => {
  const [authenticated, setAuthenticated] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
