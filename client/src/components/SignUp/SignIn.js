import React from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const { email, password } = data;
    console.log(data);
  }

  return (
    <div>
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default SignIn;
