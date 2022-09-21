import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { checkRegistered } from "../../core/container";
import { useForm } from "react-hook-form";
import "./styles.scss";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  async function onSubmit(data) {
    setMessage('');
    try {
      const res = await fetch("http://localhost:5000/user/register", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const response = await res.json();
      if (res.status === 201) {
        setMessage("Account created successfully");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
      setMessage(response.message);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="signup signin">
      {/* {checkRegistered() && (<Navigate to="/" replace={true} />)} */}
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!!message && <label className="error-message">{message}</label>}
        <input
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />
        <input
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />
        <input
          placeholder="Email address"
          {...register("email", { required: true })}
        />
        <input
          placeholder="Type your password"
          type="password"
          name="password"
          autoComplete="on"
          {...register("password", { required: true })}
        />
        <input type="submit" />
      </form>
      <p className="redirect-link">Already have an account? <Link to="/signin">Sign in</Link> -{">"}</p>
    </div>
  );
};

export default SignUp;
