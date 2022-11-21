import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // navigates to /transactions/new page
  const navigateTo = () => {
    navigate("/transactions/new", {
      replace: true,
    });
  };

  return (
    <div className="dashboard section">
      <button onClick={navigateTo}>
        Add transaction
      </button>
    </div>
  );
}
