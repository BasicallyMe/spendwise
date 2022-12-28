import React, { useState } from "react";
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

  const selectedCategory = watch("type");
  const [disabled, setDisabled] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const categories = {
    Expenses: [
      "Shopping",
      "Transportation",
      "Food & Drinks",
      "Gifts",
      "Entertainment",
      "Others",
    ],
    Essentials: [
      "Groceries",
      "Transportation",
      "Healthcare",
      "Bills & Subscription",
      "Utilities",
      "Supplies",
      "Debt",
      "Others",
    ],
    Investments: [
      "Insurance",
      "SIPs",
      "Stocks & Shares",
      "Bonds",
      "ETFs",
      "Others",
    ],
  };

  const onSubmit = async (data) => {
    setDisabled(true);
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
      <div className="form-container">

        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            defaultValue="Select a type"
            {...register("type", { required: true })}
          >
            <option disabled>Select a type</option>
            <option value="Income">Income</option>
            <option value="Expenses">Expense</option>
            <option value="Essentials">Essentials</option>
            <option value="Investments">Investments</option>
          </select>
          {errors.type?.type === "required" && (
            <span className="error">Please select a type</span>
          )}
          {categories[selectedCategory] !== undefined && (
            <select
              defaultValue="Select a category"
              {...register("category", { required: true })}
            >
              <option disabled>Select a category</option>
              {categories[selectedCategory].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
          <input
            placeholder="Amount"
            {...register("amount", { required: true, min: 0 })}
          />
          {errors.amount?.type === "required" && (
            <span className="error">Please type an amount</span>
          )}
          {errors.amount?.type === "min" && (
            <span className="error">Amount entered cannot be negative.</span>
          )}
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
            <button
              disabled={disabled}
              className="btn submit-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTransaction;
