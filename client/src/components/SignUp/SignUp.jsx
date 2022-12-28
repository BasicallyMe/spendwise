import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Icon } from "../Icons";
import "./styles.scss";

const SignUp = () => {
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
      const res = await fetch("/user/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      status = await res.status;
      const response = await res.json();
      if (res.status === 409) {
        setMessage(response.message);
      }
      console.log('🌟', response); 
    } catch (err) {
      console.log(err);
    }
    if (status === 201) {
      setSignedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
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
          <h1>Let's get you started</h1>
          <h4>Fill in your details and you're good to go</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!!message && <label className="error-message">{message}</label>}
          <input
            placeholder="First name"
            {...register("firstName", { required: true })}
          />
          <input
            placeholder="Last name"
            {...register("lastName", { required: true })}
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            {...register("email", { required: true })}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="off"
            {...register("password", { required: true })}
          />
          <button type="submit" className="btn signin" disabled={disabled}>
            {disabled
              ? isSignedIn
                ? "Creating your account"
                : "Wizard at work"
              : "Create account"}
          </button>
        </form>
        <p className="redirect-link">
          Already have an account?{" "}
          <Link to="/signin">
            Sign in<span> -{">"}</span>
          </Link>
        </p>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default SignUp;
