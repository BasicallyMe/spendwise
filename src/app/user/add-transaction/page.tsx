"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addNewTransaction } from "backend/firestore";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import LoadingCircle from "../../../../public/icons/loadingcircle";

const today = new Date();

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
  } = useForm<Inputs>({
    defaultValues: {
      type: "income",
      category: "",
      amount: 0,
      date: format(today, "yyyy-MM-dd"),
    },
  });

  const watchType = watch("type");
  const watchAmount = watch("amount");
  const watchCategory = watch("category");
  const watchDate = watch("date");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [response, setResponse] = useState({ status: undefined, message: "" });
  const router = useRouter();

  useEffect(() => {
    if (watchType !== "" && watchType !== "income") {
      setSelectedCategory(categories[watchType]);
    }
  }, [watchType]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setDisableSubmit(true);
    const res = await addNewTransaction(data);
    setResponse(res);
    setTimeout(() => {
      setDisableSubmit(false);
      setResponse({ status: undefined, message: '' });
    }, 2000);
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div
        className={`${response?.status === 'error' ? 'bg-orange-500' : 'bg-green-500'} w-1/4 ${
          disableSubmit ? "h-10" : "h-32"
        } transition-height flex flex-col justify-center ${
          disableSubmit ? "items-center" : ""
        } px-4 rounded-lg my-4`}
      >
        {disableSubmit ? (
          response.status === undefined ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </>
          ) : (
            <div className="flex flex-row text-sm text-white items-center">
              {response?.status === "success" ? (
                <CheckCircle2 size={20} strokeWidth={1.25} />
              ) : (
                <AlertCircle size={20} strokeWidth={1.25} />
              )}
              <span className="ml-2">{response?.message}</span>
            </div>
          )
        ) : (
          <>
            <span className="text-sm text-green-200 capitalize">
              {watchType}
            </span>
            <div className="flex flex-row flex-wrap items-end py-2">
              <span className="text-4xl font-semibold text-white mr-1">
                {watchAmount}
              </span>
              <span className="text-xs mb-1 text-white">
                {watchCategory !== "" && `on `}
                <span>{watchCategory}</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-900">
                {format(new Date(watchDate), "eee, MMMM dd")}
              </span>
            </div>
          </>
        )}
      </div>
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
        <select
          id="category"
          name="category"
          {...register("category", { required: watchType !== "income" })}
          className="border px-2 py-3 rounded-md text-sm mt-2"
          disabled={watchType === "" || watchType === "income"}
        >
          <option value="" selected disabled>
            Choose a category
          </option>
          {selectedCategory.map((item, index) => (
            <option key={item} value={item} className="capitalize">
              {item}
            </option>
          ))}
        </select>
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
          disabled={disableSubmit}
          className={`text-sm py-2 px-3 mt-3 text-white ${
            disableSubmit ? "bg-slate-400" : "bg-green-500"
          } rounded-md cursor-pointer`}
        />
        <button
          onClick={() => router.back()}
          className="text-sm py-2 px-3 mt-3 text-green-500 border border-green-500 rounded-md cursor-pointer"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
