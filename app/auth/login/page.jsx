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
import { Button, Checkbox, Input, Spinner } from "@material-tailwind/react";

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
      console.log(res);
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
    setIsLoading(true);

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
        <Input
          label={
            <div className="dark:text-gray-300">
              <Translate>Email</Translate>
            </div>
          }
          size="lg"
          type="email"
          value={email}
          className={`bg-indigo-300/70 border-0 dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200 ${
            error && "border-red-500"
          }`}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label={
            <div className="dark:text-gray-300">
              <Translate>Password</Translate>
            </div>
          }
          icon={
            !isShowPassword ? (
              <EyeIcon
                onClick={() => setIsShowPassword(true)}
                className="rounded-md cursor-pointer "
              />
            ) : (
              <EyeOffIcon
                onClick={() => setIsShowPassword(false)}
                className="rounded-md cursor-pointer "
              />
            )
          }
          size="lg"
          onChange={(e) => setPassword(e.target.value)}
          type={isShowPassword ? "text" : "password"}
          value={password}
          className={`bg-indigo-300/70 border-0 dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200 ${
            error && "border-red-500"
          }`}
        />

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
          <Checkbox
            label={
              <div className="dark:text-gray-300">
                <Translate>Remember Me</Translate>
              </div>
            }
            onChange={(e) => setIsRememberedUser(e.target.checked)}
            checked={isRememberedUser}
            value={isRememberedUser || ""}
            id="remember-me"
          />
          <Link
            className="text-indigo-400 font-bold text-sm"
            href="/auth/forgot-password"
          >
            <Translate>Forgot password?</Translate>
          </Link>
        </div>

        <div className="flex flex-col text-center gap-5">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 py-4"
            type="submit"
            onClick={handleLogin}
          >
            {loading ? (
              <Spinner color="green" className="mx-auto" />
            ) : (
              <Translate>Log In</Translate>
            )}
          </Button>

          {/* <p className="text-xl">OR</p>

          <Button
            className=" translation-all flex items-center justify-center gap-3 bg-indigo-600 ease-in-out hover:bg-indigo-700"
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
          </Button> */}
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
