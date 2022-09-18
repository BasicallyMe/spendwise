import React from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    const { firstName, LastName, email, password } = data;  
    console.log(data)
  };

  return (
    <div>
      <h1>Register your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default SignUp;
