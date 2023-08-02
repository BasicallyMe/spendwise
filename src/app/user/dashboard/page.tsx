import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src="/images/under_construction.png"
        alt="Placeholder"
        width="300"
        height="300"
      />
      <div className="">
        <h2 className="text-3xl font-semibold text-center">Wizards at work</h2>
        <p className="text-sm text-slate-400 text-center mt-2">
          The wizards are working their magic to create the perfect Dashboard
          for you.
        </p>
        <p className="text-sm text-slate-400 text-center mt-2">
          See your recent{" "}
          <Link href="/user/transactions" className="text-blue-600">
            transactions
          </Link>
        </p>
      </div>
    </div>
  );
}
