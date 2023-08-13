"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addNewTransaction } from "../../../firebase/firestore";
import { useRouter } from "next/navigation";

type Inputs = {
  type: string;
  category: string;
  amount: number;
  date: string;
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
  personal: [
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
  const router = useRouter();

  useEffect(() => {
    if (watchType !== "" && watchType !== "income") {
      setSelectedCategory(categories[watchType]);
    }
  }, [watchType]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await addNewTransaction(data);
    console.log('👀response', response);
  };
  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-1/4 py-2"
      >
        <select
          id="type"
          name="type"
          {...register("type", { required: true })}
          className="border px-2 py-3 rounded-md text-sm"
        >
          <option
            value=""
            selected
            disabled
            className="py-1 text-sm text-slate-400"
          >
            Choose a type
          </option>
          <option value="income" className="text-sm text-slate-700">
            Income
          </option>
          <option value="essentials" className="text-sm text-slate-700">
            Essentials
          </option>
          <option value="investments" className="text-sm text-slate-700">
            Investments
          </option>
          <option value="personal" className="py-1 text-sm text-slate-700">
            Personal
          </option>
        </select>
        {errors.type && (
          <span className="text-xs font-medium text-red-500 my-1">
            This field is required
          </span>
        )}
        {watchType !== "" && watchType !== "income" && (
          <select
            id="category"
            name="category"
            {...register("category", { required: true })}
            className="border px-2 py-3 rounded-md text-sm mt-2"
          >
            <option value="" selected disabled>
              Choose a category
            </option>
            {selectedCategory.map((item, index) => (
              <option value={item} className="capitalize">
                {item}
              </option>
            ))}
          </select>
        )}
        {errors.category && (
          <span className="text-xs text-red-500 my-1 font-medium">
            This field is required
          </span>
        )}

        <input
          type="number"
          placeholder="Amount"
          {...register("amount", { required: true })}
          className="border px-2 py-3 rounded-md text-sm mt-2"
        />
        {errors.amount && (
          <span className="text-xs text-red-500 my-1 font-medium">
            Please type an amount
          </span>
        )}

        <input
          type="date"
          {...register("date", { required: true })}
          className="border px-2 py-3 rounded-md text-sm mt-2"
        />

        <input
          type="submit"
          className="text-sm py-2 px-3 mt-3 text-white bg-blue-600 rounded-md cursor-pointer"
        />
        <button onClick={() => router.back()} className="text-sm py-2 px-3 mt-3 text-blue-600 border border-blue-600 rounded-md cursor-pointer">
          Cancel
        </button>
      </form>
    </div>
  );
}
