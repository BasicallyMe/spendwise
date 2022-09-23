import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {

  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      const res = await fetch("http://localhost:5000/user/signout", {
        method: 'DELETE',
        credentials: 'include',
      });
      console.log(res.status);
      if (res.status === 200) {
        navigate("/signin", {replace: true});
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ul>
        <li>Dashboard</li>
        <li>Transactions</li>
      </ul>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
