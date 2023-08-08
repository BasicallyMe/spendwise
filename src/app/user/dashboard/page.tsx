import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="h-full">
      <div className="py-3">
        <Link
          href="/user/add-transaction"
          className="text-sm bg-blue-500 py-4 text-white"
        >
          Add transactions
        </Link>
      </div>
    </div>
  );
}
