import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiClipboard, FiSettings, FiLogOut } from "react-icons/fi";
import { getUserData } from '../../fetchers/fetchers';
import avatar from '../../assets/avatar.jpg';
import { Icon } from "../Icons";
import "./Navigation.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Navigation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery(['user'], getUserData);

  console.log('👀', data.response);

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
    navigate("/signin", { replace: true });
  }

  return (
    <div className="nav-links">
      <div className="logo-holder">
        <Icon name={`Logo`} />
        <span>Expensi</span>
      </div>
      <div className="links">
        <NavLink
          to={`/`}
          className={({ isActive }) => (isActive ? "home" : null)}
        >
          <FiHome />
          Home
        </NavLink>
        <NavLink
          to={`dashboard`}
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          <FiGrid />
          Dashboard
        </NavLink>
        <NavLink
          to={`transactions`}
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          <FiClipboard />
          Transactions
        </NavLink>
        <NavLink
          to={`settings`}
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          <FiSettings />
          Settings
        </NavLink>
        <button className="btn signout" onClick={handleSignOut}>
          <FiLogOut />
          Sign out
        </button>
      </div>
      <div className="user">
        <div className="avatar">
          <img src={avatar}/>
        </div>
        <div className="user-info">
          <h4 className="user-name">Jane Doe</h4>
          <span className="user-email">janedoe@example.com</span>
        </div>
      </div>
    </div>
  );
}
