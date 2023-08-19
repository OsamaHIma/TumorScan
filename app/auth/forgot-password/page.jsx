"use client";
import { sendPasswordResetEmailToUser } from "@/lib/firebase";
import { useState } from "react";
import { Translate } from "translate-easy";


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await sendPasswordResetEmailToUser(email)
      setSuccess(true);
    } catch (error) {
      setError(error.code);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-20">
      <h1 className="text-3xl font-bold mb-4">
        <Translate>{success ? "Password reset link sent" : "Forgot your password?"}</Translate>
      </h1>
      {!success ? (
        <form
          className="w-full max-w-lg flex flex-col gap-4"
          onSubmit={handleResetPassword}
        >
          <label htmlFor="email" className="text-lg font-semibold">
            <Translate>Enter your email address</Translate> :
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${error && "border-red-500"
                }`}
            required
          />
          {error && (<div className="text-red-500 text-sm"><Translate>{error}</Translate></div>)}
          <button type="submit" className="btn bg-orange-400">
            <Translate>{isLoading? "Loading...":"Reset password"}</Translate>
          </button>
        </form>
      ) : (
        <div className="text-lg w-full max-w-lg mt-3 font-semibold dark:text-slate-50">
          <Translate>If the email address exist in our database, A password reset link will be sent to your email address</Translate> .
        </div>
      )}
    </div>
  );
};
export default ForgotPasswordPage;
