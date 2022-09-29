import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { checkLoggedIn, devUrl } from "../../core/container";
import './styles.css';

const SignIn = () => {
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
    let status = null;
    try {
      const res = await fetch(`${devUrl}/user/signin`, {
        method: 'POST',
        cors: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const response = await res.json();
      console.log("response", response);
      // status = res.status;
      // if (res.status === 401) {
      //   setMessage(response.message);  
      // }
    } catch(err) {
      console.log(err);
    }
    if (status === 202) {
      navigate("/", { replace: true });
    }
  }

  return (
    <div className="signup signin">
      {/* {checkLoggedIn() && <Navigate to="/" replace={true} />} */}
      <h1>Sign in</h1>
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
        <input type="submit" />
      </form>
      <p className="redirect-link">
        Don't have an account? <Link to="/register">Sign up</Link> -{">"}
      </p>
    </div>
  );
};

export default SignIn;
