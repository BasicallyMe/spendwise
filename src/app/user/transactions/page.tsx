"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PenSquare, Trash2 } from "lucide-react";
import { useTransactionContext } from "context/TransactionContext";
import { getMonthString, months } from "utils/helper";
import { getMonth } from "date-fns";
import { useStore } from "utils/store";
import LoadingSkeleton from "./loadingSkeleton";

export default function Transactions() {
  const { transactions } = useTransactionContext();
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useStore((state) => [
    state.currentMonth,
    state.setCurrentMonth,
  ]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Update filteredTransactions whenever currentMonth changes
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      return transaction.month === currentMonth; // Assuming 'month' is a property in your transaction data
    });
    setFilteredTransactions(filtered);
  }, [transactions, currentMonth]);

  const handleMonthChange = (event) => {
    const selectedMonthIndex = parseInt(event.target.value, 10);
    setCurrentMonth(selectedMonthIndex); // Update currentMonth locally
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-row justify-end px-3 py-3 my-4">
        <div className="flex flex-wrap gap-1">
          <span className="mr-3 text-sm p-2 rounded-md text-white bg-blue-400">
            Month:{" "}
            <span className="text-slate-800">
              {getMonthString(currentMonth)}
            </span>
          </span>
          <span className="mr-3 text-sm text-white bg-green-400 p-2 rounded-md">
            Income: <span className="text-slate-800">1000</span>
          </span>
          <span className="mr-3 text-sm text-white bg-amber-400 p-2 rounded-md">
            Essentials: <span className="text-slate-800">1000</span>
          </span>
          <span className="mr-3 text-sm text-white bg-purple-400 p-2 rounded-md">
            Investments: <span className="text-slate-800">1000</span>
          </span>
          <span className="mr-3 text-sm text-white bg-orange-400 p-2 rounded-md">
            Expenses: <span className="text-slate-800">1000</span>
          </span>
          <select
            className="text-sm p-2 rounded-md border"
            value={currentMonth}
            onChange={handleMonthChange}
          >
            {months.map((month, index) => (
              <option key={index.toString()} value={index} className="py-2">
                {month}
              </option>
            ))}
          </select>
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
          <p>We couldn't find any transactions for this month. Try adding a few.</p>
        </div>
      )}
    </div>
  );
}
