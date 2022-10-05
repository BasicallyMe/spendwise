import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  async function onSubmit(data) {
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
      if (status === 401) {
        setMessage(response.message);
      }
      console.log("response", response);
      status = await res.status;
    } catch (err) {
      console.log(err);
    }
    if (status === 202) {
      navigate("/", { replace: true });
    }
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
          <input type="submit" value="Sign in" />
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
