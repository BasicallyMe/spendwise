"use client"

import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  return (
    <div className="h-full">
      <div className="py-3">
        <button className="text-sm text-white rounded-md bg-blue-500 py-3 px-5" onClick={() => router.push('/user/add-transaction')}>Add transaction</button>
      </div>
    </div>
  );
}
