"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { signUpSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const SignUpPage = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    Company_Name: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setError(null);
    try {
      signUpSchema.validateSync(
        {
          name: formData.name,
          Company_Name: formData.Company_Name,
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
    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/access-tokens/register`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Error registering user.");
    //   }
    //   setLoading(false);
    //   toast.success("registered successfully.");
    //   router.push("/dashboard");
    // } catch (error) {
    //   setLoading(false);
    //   console.error(error);
    //   toast.error(error.message);
    // }
  };

  return (
    <div className="px-4 flex flex-col mt-24 gap-8 ">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Tumor Scan!
          {/* <MdWavingHand className="text-yellow-500 mx-2 text-3xl" /> */}
        </h1>
        <h3 className="text-gray-500 text-sm mt-4">
          Empowering Cancer Detection and Tumor Analysis.
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-4 text-md font-bold">
            Name
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
            Email
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
            Password
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
            Confirm Password
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
          <div className="text-xs  flex flex-col text-red-500 mx-4">
            {error.map((err, key) => {
              return <p key={key}>*{err}</p>;
            })}
          </div>
        )}
        <button
          className="btn translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700"
          type="submit"

        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <p className="text-gray-400 relative bottom-4 text-center">
        You have an account?{" "}
        <Link className="text-indigo-400 font-bold text-sm" href="/auth/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage