export default function LoadingSkeleton() {
  return (
    <div className="w-full h-full py-4 px-3">
      <div className="flex flex-row py-4 mb-5">
        <div className="w-20 h-7 rounded-md mr-3 bg-slate-300" />
        <div className="w-20 h-7 rounded-md mr-3 bg-slate-300" />
        <div className="w-20 h-7 rounded-md mr-3 bg-slate-300" />
        <div className="w-20 h-7 rounded-md mr-3 bg-slate-300" />
        <div className="w-20 h-7 rounded-md mr-3 bg-slate-300" />
      </div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-sm font-medium">Your transactions</h2>
        <div className="flex flex-row">
          <div className="w-28 h-7 rounded-md mr-3 bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
