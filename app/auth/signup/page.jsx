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
      const data = await signWithGoogle();
      console.log(data.user.email)

      toast.success("Singed in successfully");
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
    setLoading(true)
    try {
      const { user } = await addUserWithEmailAndPassword(formData.email, formData.password);
      // console.log(user)

      const res = await createUserDocument(user, { name: formData.name, password: formData.password });
      // setValidated("");
      router.push(`/auth/login`);

      toast.success("Singed Up successfully");
    } catch (err) {
      toast.error('Something went wrong '+err.code || err.message || err);
    }
    setLoading(false)

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
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-4 text-md font-bold">
            <Translate>Name</Translate>
          </label>
          <input
            type="text"
            placeholder="Enter Your Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${error && "border-red-500"
              }`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-4 text-md font-bold">
            <Translate>Email</Translate>
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${error && "border-red-500"
              }`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-4 text-md font-bold">
            <Translate>Password</Translate>
          </label>
          <div className="relative w-full">
            <input
              type={passwordIcon ? "text" : "password"}
              placeholder="Enter Your Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password_confirmation"
            className="mb-4 text-md font-bold"
          >
            <Translate>Confirm Password</Translate>
          </label>
          <div className="relative w-full">
            <input
              type={passwordIcon ? "text" : "password"}
              placeholder="Confirm Your Password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${error && "border-red-500"
                }`}
            />

          </div>
        </div>
        {error && (
          <div className="flex flex-col gap-1 text-red-500 mx-4 ltr:text-left rtl:text-right">
            {error.map((err, key) => {
              return <p key={key}>*<Translate>{error}</Translate></p>;
            })}
          </div>
        )}
        <button
          className="btn translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700"
          type="submit"

        >
          <Translate>{loading ? "Loading..." : "Sign Up"}</Translate>
        </button>
        <button onClick={signInWithGoogle}>
          Google
        </button>
      </form>
      <p className="text-gray-400 relative bottom-4 text-center">
        <Translate>You have an account</Translate>?{" "}
        <Link className="text-indigo-400 font-bold text-sm" href="/auth/login">
          <Translate>Login</Translate>
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage