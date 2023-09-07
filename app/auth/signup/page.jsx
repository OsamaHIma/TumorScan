"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { signUpSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Translate } from "translate-easy";
import {
  addUserWithEmailAndPassword,
  createUserDocument,
  signWithGoogle,
} from "@/lib/firebase";
import TermsModal from "@/components/TermsModal";
import { signIn } from "next-auth/react";
import { Button, Checkbox, Spinner, Input,Typography } from "@material-tailwind/react";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleTermsClick = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const togglePasswordIcon = () => {
    setPasswordIcon(!passwordIcon);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signWithGoogle();
      console.log("user", user);
      const signInUser = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: "123456",
      });

      if (!signInUser.error) {
        handleRememberUser();
        router.push(`/upload`);
        toast.success("Singed in successfully");
      } else {
        setError([signInUser.error]);
        // setLoading(false);
      }
      toast.success("Singed up successfully");
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      signUpSchema.validateSync(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password: formData.password_confirmation,
          termsCheckbox: termsChecked,
        },

        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { user } = await addUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      const res = await createUserDocument(user, {
        name: formData.name,
        password: formData.password,
      });

      toast.success(
        `Email verification link has been sent to your email: ${formData.email}`
      );
      router.push(`/verify`);
    } catch (err) {
      toast.error("Something went wrong: " + err.code || err.message || err);
    }
    setLoading(false);
  };

  return (
    <div className="px-4 flex flex-col mt-10 md:mt-20 gap-8 rtl:text-right w-[80%]">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          <Translate>Welcome to</Translate> Tumor Scan!
          {/* <MdWavingHand className="text-yellow-500 mx-2 text-3xl" /> */}
        </h1>
        <h3 className="text-gray-500 text-sm mt-4">
          <Translate>Empowering Cancer Detection and Tumor Analysis</Translate>.
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <Input
          label={
            <div className="dark:text-gray-300">
              <Translate>Name</Translate>
            </div>
          }
          size="lg"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`bg-indigo-300/70 outline-none dark:!border-0 dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200`}
          error={error && true}
        />
        <Input
          label={
            <div className="dark:text-gray-300">
              <Translate>Email</Translate>
            </div>
          }
          size="lg"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`bg-indigo-300/70 outline-none dark:!border-0 dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200`}
          error={error && true}
        />

        <Input
          label={
            <div className="dark:text-gray-300">
              <Translate>Password</Translate>
            </div>
          }
          icon={
            passwordIcon ? (
              <EyeIcon
                onClick={togglePasswordIcon}
                className="rounded-md cursor-pointer "
              />
            ) : (
              <EyeOffIcon
                onClick={togglePasswordIcon}
                className="rounded-md cursor-pointer "
              />
            )
          }
          size="lg"
          type={passwordIcon ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={`bg-indigo-300/70 outline-none dark:!border-0 dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200`}
          error={error && true}
        />
<Typography
        variant="small"
        color="gray"
        className="flex items-center gap-1 font-normal text-xs md:text-sm dark:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="-mt-px h-6 w-6 text-yellow-500"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
        Use at least 8 characters, one uppercase, one lowercase and one number.
      </Typography>
        <Input
          label={
            <div className="dark:text-gray-300">
              <Translate>Confirm Password</Translate>
            </div>
          }
          size="lg"
          type={passwordIcon ? "text" : "password"}
          id="password_confirmation"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleInputChange}
          className={`bg-indigo-300/70 outline-none dark:!border-0 dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200`}
          error={error && true}
        />
        <div className="flex rtl:flex-row-reverse gap-3 items-center">
          <Checkbox
            id="termsCheckbox"
            value={termsChecked}
            onChange={handleCheckboxChange}
          />
          <p className="dark:text-gray-300 rtl:text-right">
            <Translate>I agree to the</Translate>{" "}
            <span
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
              onClick={handleTermsClick}
            >
              <Translate>Terms and Conditions</Translate>
            </span>
          </p>
        </div>

        {showTermsModal && (
          <TermsModal open={showTermsModal} handleOpen={closeTermsModal} />
        )}
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

        <div className="flex flex-col text-center gap-5">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 py-4"
            type="submit"
          >
            {loading ? (
              <Spinner color="green" className="mx-auto" />
            ) : (
              <Translate>Register</Translate>
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
              <Translate translations={{ ar: "انشئي حساب عن طريق Google" }}>
                Sign up with Google
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
      <p className="text-gray-400 relative bottom-4 text-center">
        <Translate>You have an account</Translate>?{" "}
        <Link className="text-indigo-400 font-bold text-sm" href="/auth/login">
          <Translate>Login</Translate>
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
