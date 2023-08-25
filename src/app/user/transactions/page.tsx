"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PenSquare, Trash2 } from "lucide-react";
import { getAllTransactions } from "backend/firestore";
import { getMonthString } from 'utils/helper'

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getAllTransactions();
    if (response.status === "success") {
      console.log(response.data);
      setTransactions(response.data);
      setLoading(false);
    }
  }

  // if (loading) {
  //   return <div>Loading your transactions</div>;
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
      <h2>Transactions</h2>
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
              Year
            </th>
            <th className="font-normal text-xs text-slate-500 text-left py-3">
              Month
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
          {transactions.map((item, index) => (
            <tr key={index.toString()} className="">
              <td className="text-sm text-slate-600 font-medium py-3 pr-6">
                {item.category}
              </td>
              <td className="text-sm text-slate-600 font-medium py-3 pr-6 capitalize">
                {item.type}
              </td>
              <td className="text-sm text-slate-600 font-medium py-3 pr-6">
                {item.year}
              </td>
              <td className="text-sm text-slate-600 font-medium py-3 pr-6">
                {getMonthString(item.month)}
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
