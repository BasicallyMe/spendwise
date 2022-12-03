import React from "react";
import { Icon } from "../Icons";
import { useForm } from "react-hook-form";
import "./Transaction.scss";

const NewTransaction = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/user/transaction/new", {
        method: "POST",
        cors: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = () => {
    console.log("handle cancel click");
  };

  return (
    <div className="new-transaction section">
      <h2>New transaction</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Amount"
          {...register("amount", { required: true })}
        />
        <select
          defaultValue="Select an option"
          {...register("category", { required: true })}
        >
          <option disabled>Select an option</option>
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Groceries">Groceries</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <div className="payment-method">
          <h4>Payment method</h4>
          <label>
            <input type="radio" {...register("payment")} value="0124" />
            <span className="card-number">4628 4248 6249 0124</span>
            <span className="card-logo">
              <Icon name="Visa" />
            </span>
          </label>
          <label>
            <input type="radio" {...register("payment")} value="0134" />
            <span className="card-number">6457 7685 7757 0134</span>
            <span className="card-logo">
              <Icon name="Mastercard" />
            </span>
          </label>
        </div>
        <input
          type="date"
          placeholder="date"
          {...register("date", { required: true })}
        />
        <textarea
          placeholder="Description"
          {...register("description")}
        ></textarea>
        <div className="btn-wrapper">
          <button
            type="button"
            className="btn cancel-btn"
            onClick={() => handleCancelClick()}
          >
            Cancel
          </button>
          <button className="btn submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTransaction;
