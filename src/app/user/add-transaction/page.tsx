"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

type Inputs = {
  type: string;
  category: string;
  amount: number;
};

const categories = {
  essentials: [
    "Groceries",
    "Utilities",
    "Bills & Payments",
    "Installments",
    "Medicines",
    "Others",
  ],
  investments: ["Insurance", "Stocks & Shares", "Mutual Funds", "Others"],
  spendings: [
    "Entertainment",
    "Shopping",
    "Travelling",
    "Food & Drinks",
    "Others",
  ],
};

export default function AddTransaction() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const watchType = watch("type", "");
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    console.log("👀", watchType);
  }, [watchType]);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log("👀🦾", data);
  return (
    <div className="h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/4">
        <select id="type" name="type" {...register("type", { required: true })}>
          <option value="" selected disabled>
            Choose a type
          </option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && (
          <span className="text-sm text-red-500 my-2">
            This field is required
          </span>
        )}
        {watchType === "expense" && (
          <select
            id="category"
            name="category"
            {...register("type", { required: true })}
          >
            <option value="select" selected disabled>
              Choose a category
            </option>
            <option value="income">Income</option>
            <option value="expense">Investments</option>
            <option value="expense">Expense</option>
          </select>
        )}
        {errors.category && (
          <span className="text-sm text-red-500 my-2">
            This field is required
          </span>
        )}

        <input
          type="submit"
          className="text-sm py-2 px-3 mt-3 text-white bg-blue-600 rounded-md"
        />
      </form>
    </div>
  );
}
