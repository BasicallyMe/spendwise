import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../../core/container";
import { useForm } from "react-hook-form";
import { Icon } from "../Icons";
import "./styles.scss";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [isSignedIn, setSignedIn] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(data) {
    setDisabled(true);
    setMessage("");
    let status = null;
    try {
      const res = await fetch("/user/signin", {
        method: "POST",
        cors: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      status = await res.status;
      if (status === 401) {
        setMessage(response.message);
      }
      await setUserData(response);
    } catch (err) {
      console.log(err);
    }
    if (status === 200) {
      setSignedIn(true);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    }
  }

  async function setUserData({ firstName, lastName, email }) {
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
  }

  return (
    <div className="page">
      <div className="left">
        <div className="logo-holder">
          <Icon name="Logo" />
          <h2>Expensi</h2>
        </div>
        <div className="title">
          <h1>Welcome back</h1>
          <h4>Type in your credentials and sign in</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!!message && <label className="error-message">{message}</label>}
          <input
            placeholder="Email address"
            type="email"
            {...register("email", { required: true })}
          />
          <input
            placeholder="Type your password"
            type="password"
            autoComplete="on"
            {...register("password", { required: true })}
          />
          <button type="submit" className="btn signin" disabled={disabled}>
            {disabled
              ? isSignedIn
                ? "Signing you in"
                : "Doing some magic"
              : "Sign in"}
          </button>
        </form>
        <p className="redirect-link">
          Don't have an account?{" "}
          <Link to="/register">
            Sign up<span> -{">"}</span>
          </Link>
        </p>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default SignIn;
