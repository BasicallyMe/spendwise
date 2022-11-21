import React from "react";
import { useForm } from "react-hook-form";

const AddTransaction = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="new-transaction section">
        <form onSubmit={handleSubmit(onSubmit)}>
            
        </form>
    </div>
  );
};

export default AddTransaction;
