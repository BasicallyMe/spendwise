import Image from "next/image";

export default function Transactions() {
  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center">
      <Image
        src="/images/transactions.png"
        alt="Placeholder"
        width="300"
        height="300"
      />
      <h2 className="text-2xl font-semibold mb-2">
        Woah! You haven't spent anything
      </h2>
      <p className="text-sm text-slate-400">
        Looks like you haven't recorded any expense yet. Try adding a few
        expenses first.
      </p>
    </div>
  );
}
