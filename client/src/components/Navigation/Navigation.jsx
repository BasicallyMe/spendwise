import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiCreditCard,
  FiSettings,
  FiLogOut
} from "react-icons/fi";
import useBearStore from "../../core/useStore";
import { getUserData } from "../../fetchers/fetchers";
import { isEqual } from "lodash";
import avatar from "../../assets/avatar.jpg";
import { Icon } from "../Icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./Navigation.scss";

export default function Navigation() {
  const navigate = useNavigate();
  const { user, setUser } = useBearStore();
  const queryClient = useQueryClient();

  const { data, status, isSuccess } = useQuery(["user", "data"], getUserData);

  useEffect(() => {
    if (isSuccess) {
      if (!isEqual(user, data.response)) {
        setUser(data.response);
      }
    }
  }, [isSuccess, data]);

  async function handleSignOut() {
    try {
      const res = await fetch("http://localhost:5000/user/signout", {
        method: "DELETE",
        credentials: "include",
      });
      console.log(res.status);
      if (res.status === 200) {
        navigate("/signin", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/signin", { replace: true });
  }

  return (
    <div className="nav-links">
      <div className="logo-holder">
        <Icon name="Logo" />
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
          <FiCreditCard />
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
        {isSuccess ? (
          <>
            <div className="avatar">
              <img src={avatar} />
            </div>
            <div className="user-info">
              <h4 className="user-name">{`${user?.firstName} ${user?.lastName}`}</h4>
              <span className="user-email">{user?.email}</span>
            </div>
          </>
        ) : (
          <AvatarLoader />
        )}
      </div>
    </div>
  );
}


const AvatarLoader = () => {
  return (
    <>
      <div className="avatar loader" />
      <div className="user-info loader">
        <span className="user-name loader" />
        <span className="user-email loader" />
      </div>
    </>
  );
}