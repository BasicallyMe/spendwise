"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PenSquare, Trash2 } from "lucide-react";
import { useTransactionContext } from "context/TransactionContext";
import { getMonthString, months } from "utils/helper";
import { getMonth, parseISO } from "date-fns";
import { useStore } from "utils/store";
import LoadingSkeleton from "./loadingSkeleton";

export default function Transactions() {
  const { transactions } = useTransactionContext();
  const [loading, setLoading] = useState(true);
  const [expenseSummary, setExpenseSummary] = useState({
    income: null,
    investments: null,
    essentials: null,
    personal: null,
  });
  const [currentMonth, setCurrentMonth] = useStore((state) => [
    state.currentMonth,
    state.setCurrentMonth,
  ]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Update filteredTransactions whenever currentMonth changes
  useEffect(() => {
    setLoading(true);
    const filtered = transactions.filter((transaction) => {
      return transaction.month === currentMonth; // Assuming 'month' is a property in your transaction data
    });
    setFilteredTransactions(quickSortByDate(filtered));
  }, [transactions, currentMonth]);

  useEffect(() => {
    let summary = { income: 0, investments: 0, essentials: 0, personal: 0 };
    if (filteredTransactions.length !== 0) {
      filteredTransactions.map((item) => {
        switch (item.type) {
          case "income":
            summary.income = summary.income + parseInt(item.amount);
            break;
          case "investments":
            summary.investments = summary.investments + parseInt(item.amount);
            break;
          case "essentials":
            summary.essentials = summary.essentials + parseInt(item.amount);
            break;
          case "personal":
            summary.personal = summary.personal + parseInt(item.amount);
            break;
        }
      });
    }
    setExpenseSummary({ ...summary });
    setLoading(false);
  }, [filteredTransactions]);

  const handleMonthChange = (event) => {
    const selectedMonthIndex = parseInt(event.target.value, 10);
    setCurrentMonth(selectedMonthIndex); // Update currentMonth locally
  };

  function quickSortByDate(arr) {
    if (arr.length <= 1) {
      return arr; // Base case: already sorted
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === pivotIndex) continue; // Skip the pivot element
      if (new Date(arr[i].date) > new Date(pivot.date)) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...quickSortByDate(left), pivot, ...quickSortByDate(right)];
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-full h-full relative">
      <div className="my-5">
        <h2 className="text-sm font-normal text-slate-500 mb-2">
          Your expenses summary
        </h2>
        <div className="flex flex-row flex-wrap gap-1">
          <span className="mr-3 text-sm text-green-700 bg-green-100 p-2 rounded-md">
            Income:{" "}
            <span className="text-slate-800">{expenseSummary.income}</span>
          </span>
          <span className="mr-3 text-sm text-amber-700 bg-amber-100 p-2 rounded-md">
            Essentials:{" "}
            <span className="text-slate-800">{expenseSummary.essentials}</span>
          </span>
          <span className="mr-3 text-sm text-purple-700 bg-purple-100 p-2 rounded-md">
            Investments:{" "}
            <span className="text-slate-800">{expenseSummary.investments}</span>
          </span>
          <span className="text-sm text-orange-600 bg-orange-100 p-2 rounded-md">
            Personal:{" "}
            <span className="text-slate-800">{expenseSummary.personal}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-sm font-normal text-slate-500">
          Your transactions for {getMonthString(currentMonth)}
        </h2>
        <div>
          <select
            className="text-sm p-2 rounded-md mr-2 border"
            value={currentMonth}
            onChange={handleMonthChange}
          >
            {months.map((month, index) => (
              <option key={index.toString()} value={index} className="py-2">
                {month}
              </option>
            ))}
          </select>
          <Link
            href="/user/add-transaction"
            className="text-sm bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Add transaction
          </Link>
        </div>
      </div>
      <table className="border-separate border-spacing-2 w-full">
        <thead>
          <tr>
            <th className="font-normal text-xs text-slate-500 text-left py-3">
              Type
            </th>
            <th className="font-normal text-xs text-slate-500 text-left py-3">
              Category
            </th>
            <th className="font-normal text-xs text-slate-500 text-left py-3">
              Date
            </th>
            <th className="font-normal text-xs text-slate-500 text-left py-3">
              Month
            </th>
            <th className="font-normal text-xs text-slate-500 text-left py-3">
              Year
            </th>
            <th className="font-normal text-xs text-slate-500 text-left py-3">
              Amount
            </th>
            <th className="font-normal text-xs text-slate-500 text-left py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((item, index) => (
            <tr key={index.toString()} className="">
              <td className="text-sm text-slate-600 font-medium py-3 pr-6">
                {item.category}
              </td>
              <td className="text-sm text-slate-600 font-medium py-3 pr-6 capitalize">
                {item.type}
              </td>
              <td className="text-sm text-slate-600 font-medium py-3 pr-6 capitalize">
                {item.date}
              </td>
              <td className="text-sm text-slate-600 font-medium py-3 pr-6">
                {getMonthString(item.month)}
              </td>
              <td className="text-sm text-slate-600 font-medium py-3 pr-6">
                {item.year}
              </td>
              <td className="text-sm text-slate-600 font-medium py-3 pr-6">
                {item.amount}
              </td>
              <td className="flex flex-row py-3">
                <PenSquare size={15} className="mr-2" />
                <Trash2 size={15} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!loading && filteredTransactions.length === 0 && (
        <div className="text-center text-sm text-slate-400 py-5">
          <p>
            We couldn't find any transactions for this month. Try adding a few.
          </p>
        </div>
      )}
    </div>
  );
}
