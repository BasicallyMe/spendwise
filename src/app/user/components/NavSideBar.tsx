import Link from "next/link";
import { signOutUser } from "backend/auth";
import { useRouter } from "next/navigation";

export default function NavSideBar() {
  const router = useRouter();
  async function handleSignOut() {
    const response = await signOutUser();
    if (response) router.replace("/auth/signin");
  }
  return (
    <div className="w-1/5">
      <ul className="mt-4">
        <li className="flex justify-center items-center py-1 px-3">
          <Link
            href="/user/dashboard"
            className="hover:bg-blue-500 hover:text-white w-full p-2 text-sm font-medium rounded"
          >
            Dashboard
          </Link>
        </li>
        <li className="flex justify-center items-center py-1 px-3">
          <Link
            href="/user/transactions"
            className="hover:bg-blue-500 hover:text-white w-full p-2 text-sm font-medium rounded"
          >
            Transactions
          </Link>
        </li>
        <li className="flex justify-center items-center py-1 px-3">
          <button onClick={handleSignOut} className="hover:bg-blue-500 hover:text-white w-full p-2 text-sm font-medium rounded text-left">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}
