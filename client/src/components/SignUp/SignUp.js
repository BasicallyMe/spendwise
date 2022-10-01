import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    let status = null;
    try {
      const res = await fetch("/user/register", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      status = await res.status;
      const response = await res.json();
      if (res.status === 409) {
        setMessage(response.message);
      }
      console.log(response);
    } catch(err) {
      console.log(err);
    }
    if (status === 201) {
      setMessage("Your account was created succesfully");
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  return (
    <div className="signup signin">
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
