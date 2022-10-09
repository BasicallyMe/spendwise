import React from "react";
import { useNavigate, Link as NavLink, NavLink } from "react-router-dom";
import { FiHome, FiClipboard, FiSettings, FiLogOut } from "react-icons/fi";
import { Icon } from "../Icons";
import { user } from "../../core/container";
import "./Navigation.scss";

export default function Navigation() {
  const navigate = useNavigate();

  async function handleSignOut() {
    // try {
    //   const res = await fetch("http://localhost:5000/user/signout", {
    //     method: 'DELETE',
    //     credentials: 'include',
    //   });
    //   console.log(res.status);
    //   if (res.status === 200) {
    //     navigate("/signin", {replace: true});
    //   }
    // } catch(err) {
    //   console.log(err);
    // }
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
          to={`dashboard`}
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          <FiHome />
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
        <div className="avatar"></div>
        <div className="user-info">
          <h4 className="user-name">{`${user.firstName} ${user.lastName}`}</h4>
          <span className="user-email">{`${user.email}`}</span>
        </div>
      </div>
    </div>
  );
}
