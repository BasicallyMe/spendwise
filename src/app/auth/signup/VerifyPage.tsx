import Link from "next/link";
import { Check } from "lucide-react";

export default function VerifyPage() {
  return (
    <div className="h-full w-4/5 flex flex-col justify-center">
      <div className="flex flex-row items-center mb-3">
        <h2 className="text-4xl font-semibold">Almost done</h2>
        <div className="ml-2 text-green-500 w-8 h-8 border-2 border-green-500 rounded-full flex items-center justify-center">
          <Check />
        </div>
      </div>
      <p className="text-sm text-slate-500">
        We've sent a mail at your inbox. Please click the link in the mail to
        verify your email address. Once done in you can{" "}
        <Link href="/auth/signin" className="text-blue-500">
          Sign in to your account
        </Link>.
      </p>
      <p className="text-xs text-slate-400 text-left mt-4">
        P.S. Please check your spam folder in case you didn't receive a mail in
        your inbox.
      </p>
    </div>
  );
}
