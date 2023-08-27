"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginUserSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Translate } from "translate-easy";
import { signWithGoogle } from "@/lib/firebase";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRememberedUser, setIsRememberedUser] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
     const res = await signIn("google");
     console.log(res)
      // await signWithGoogle();

      router.push(`/upload`);
      toast.success("Singed in successfully");
    } catch (err) {
      toast.error(err.code || err.message || err);
      console.error("error sing in user" + err);
    }
    setIsLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      loginUserSchema.validateSync(
        {
          email: email,
          password: password,
        },

        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }

    try {
      const user = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!user.error) {
        handleRememberUser();
        router.push(`/upload`);
        toast.success("Singed in successfully");
      } else {
        setError([user.error]);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err.code || err.message || err);
      console.error("error sing in user" + err);
    }
    setIsLoading(false);
  };
  const handleRememberUser = () => {
    if (isRememberedUser) {
      localStorage.setItem("current-user", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("current-user");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("current-user"));
    if (!user) return;
    setIsRememberedUser(true);
    setEmail(user.email);
    setPassword(user.password);
  }, []);

  return (
    <div className="px-4 flex flex-col mt-10 md:mt-20 gap-8 rtl:text-right w-[80%]">
      <div className="">
        <h1 className="text-3xl font-bold mb-4 ">
          <Translate>Welcome Back!</Translate>
          {/* <WavingHandIcon className="text-yellow-500 mx-2 text-3xl" /> */}
        </h1>
        <h3 className="text-gray-500 text-sm mt-4">
          <Translate>Empowering Cancer Detection and Tumor Analysis</Translate>.
        </h3>
      </div>

      <form className="flex flex-col gap-8" autoComplete="on">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-4 text-md font-bold ">
            <Translate>Email</Translate>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            id="email"
            className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${
              error && "border-red-500"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-4 text-md font-bold">
            <Translate>Password</Translate>
          </label>
          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={isShowPassword ? "text" : "password"}
              value={password}
              placeholder="Enter Your Password"
              id="password"
              autoComplete="current-password"
              className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${
                error && "border-red-500"
              }`}
            />
            {!isShowPassword ? (
              <EyeIcon
                onClick={() => setIsShowPassword(true)}
                className="rounded-md cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-50"
              />
            ) : (
              <EyeOffIcon
                onClick={() => setIsShowPassword(false)}
                className="rounded-md cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-50"
              />
            )}
          </div>
        </div>
        {error && (
          <ol className="flex list-decimal flex-col gap-1 text-red-500 mx-4 ltr:text-left rtl:text-right">
            {error.map((err, key) => {
              return (
                <li key={key} className="my-3">
                  *<Translate>{err}</Translate>
                </li>
              );
            })}
          </ol>
        )}
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex justify-center items-center gap-1">
            <div className="relative flex items-center rtl:flex-row-reverse">
              <input
                onChange={(e) => setIsRememberedUser(e.target.checked)}
                type="checkbox"
                checked={isRememberedUser}
                value={isRememberedUser || ""}
                id="remember-me"
                className="w-4 h-4 border relative border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="remember-me"
                className=" text-gray-400 ltr:ml-2 rtl:mr-2"
              >
                <Translate>Remember me</Translate>
              </label>
            </div>
          </div>

          <Link
            className="text-indigo-400 font-bold text-sm"
            href="/auth/forgot-password"
          >
            <Translate>Forgot password?</Translate>
          </Link>
        </div>

        <div className="flex flex-col text-center gap-5">
          <button
            className="btn translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700"
            type="submit"
            onClick={handleLogin}
          >
            <Translate>{loading ? "Loading..." : "Login"}</Translate>
          </button>

          {/* <p className="text-xl">OR</p>

          <button
            className="btn translation-all flex items-center justify-center gap-3 bg-indigo-600 ease-in-out hover:bg-indigo-700"
            type="button"
            onClick={signInWithGoogle}
          >
            {loading ? (
              <Translate>Loading...</Translate>
            ) : (
              <Translate translations={{ ar: "سجل الدخول عن طريق Google" }}>
                Sign in with Google
              </Translate>
            )}

            <img
              src="/google.png"
              className="w-7 object-contain"
              alt="google logo"
            />
          </button> */}
        </div>
      </form>
      <p className="text-gray-400 relative bottom-0 text-center">
        <Translate>You do not have an account?</Translate>{" "}
        <Link className="text-indigo-400 font-bold text-sm" href="/auth/signup">
          <Translate>Sign Up Now!</Translate>
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
