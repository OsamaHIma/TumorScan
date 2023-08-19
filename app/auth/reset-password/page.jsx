"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from 'next/navigation';
import { resetPassword } from "@/lib/firebase";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await resetPassword(oobCode,password)
      setSuccess(true);
    } catch (error) {
      setError(error.code);
    } finally {
      setIsLoading(false);
    }
  };
  const togglePasswordIcon = () => {
    setPasswordIcon(!passwordIcon);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-20">
      <h1 className="text-3xl font-bold mb-4">
        Reset your password
      </h1>
      {!success ? (
        <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleResetPassword}>
           <label htmlFor="password" className="text-lg font-semibold">
            New password:
          </label>
          <div className="relative w-full">
            <input
              type={passwordIcon ? "text" : "password"}
              placeholder="Enter Your Password"
              id="password"
              name="password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${error && "border-red-500"
                }`}
            />
            {passwordIcon ? (
              <EyeIcon
                className="cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-400"
                onClick={togglePasswordIcon}
              />
            ) : (
              <EyeOffIcon
                className="cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-400"
                onClick={togglePasswordIcon}
              />
            )}
            </div>
          {/* <label htmlFor="password" className="text-lg font-semibold">
            New password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your Password at least 8 characters"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${error && "border-red-500"
              }`}
          /> */}
          <label htmlFor="confirmPassword" className="text-lg font-semibold">
            Confirm new password:
          </label>
          <input
           type={passwordIcon ? "text" : "password"}
            id="confirmPassword"
            minLength={8}
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-blue-400 py-2 ${error && "border-red-500"
              }`}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="btn bg-orange-400">
          {isLoading ? "Loading..." : "Reset password"}
          </button>
        </form>
      ) : (
        <div className="text-lg font-semibold dark:text-slate-50">
          Your password has been reset successfully.
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;