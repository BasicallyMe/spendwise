"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PenSquare, Trash2 } from "lucide-react";
import { useTransactionContext } from "context/TransactionContext";
import { getMonthString, months } from "utils/helper";
import { getMonth } from "date-fns";
import { useStore } from 'utils/store';

export default function Transactions() {
  const { transactions } = useTransactionContext();
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useStore((state) => [state.currentMonth, state.setCurrentMonth]);
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

  // if (loading) {
  //   return (
  //     <div className="w-full h-full relative flex flex-col justify-center items-center">
  //       <h2 className="text-3xl font-semibold text-slate-400">Loading...</h2>
  //     </div>
  //   );
  // }

  // if (transactions.length === 0) {
  //   return (
  //     <div className="w-full h-full relative flex flex-col justify-center items-center">
  //       <Image
  //         src="/images/transactions.png"
  //         alt="Placeholder"
  //         width="300"
  //         height="300"
  //       />
  //       <h2 className="text-2xl font-semibold mb-2">
  //         Woah! You haven't spent anything
  //       </h2>
  //       <p className="text-sm text-slate-400">
  //         Looks like you haven't recorded any expense yet. Try adding a few
  //         expenses first.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-row justify-between px-3 py-3 my-4">
        <h2>Transactions</h2>
        <div className="">
          <span className="mr-3 text-sm text-slate-400">
            Month: <span className="text-slate-600">August</span>
          </span>
          <span className="mr-3 text-sm text-slate-400">
            Income: <span className="text-slate-600">1000</span>
          </span>
          <span className="mr-3 text-sm text-slate-400">
            Essentials: <span className="text-slate-600">1000</span>
          </span>
          <span className="mr-3 text-sm text-slate-400">
            Investments: <span className="text-slate-600">1000</span>
          </span>
          <span className="text-sm text-slate-400">
            Expenses: <span className="text-slate-600">1000</span>
          </span>
        </div>
        <select className="text-sm" value={currentMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index.toString()} value={index}>
              {month}
            </option>
          ))}
        </select>
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
    </div>
  );
}
