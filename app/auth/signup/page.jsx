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
import Modal from "@/components/Modal";
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
      const data = await signWithGoogle();
      console.log(data.user.email);

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
        `Email verification link has sent to your email: ${formData.email}`
      );
      router.push(`/verify`);
    } catch (err) {
      toast.error("Something went wrong " + err.code || err.message || err);
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
            className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${
              error && "border-red-500"
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
              type={passwordIcon ? "text" : "password"}
              placeholder="Enter Your Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${
                error && "border-red-500"
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
              className={`px-4 w-full rounded-md bg-indigo-300/70 dark:bg-slate-800 placeholder:text-slate-50 focus:outline-gray-200 py-2 ${
                error && "border-red-500"
              }`}
            />
          </div>
        </div>
        <div className="flex items-center relative rtl:flex-row-reverse">
          <input
            type="checkbox"
            id="termsCheckbox"
            value={termsChecked}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            onChange={handleCheckboxChange}
          />
          <label className="ltr:ml-2 rtl:mr-2">
            <Translate>I agree to the</Translate>{" "}
            <span
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
              onClick={handleTermsClick}
            >
              <Translate>Terms and Conditions</Translate>
            </span>
          </label>
          {showTermsModal && (
            <div
              className="absolute -top-32 flex items-center justify-center z-50 max-w-3xl md:ml-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-stone-100 dark:bg-stone-900 rounded-lg shadow-lg p-6 overflow-y-auto max-h-96">
                <h2 className="text-lg font-bold mb-4">
                  <Translate>Terms and Conditions</Translate>
                </h2>
                <p className="my-3">
                  <Translate>
                    Please read these Terms and Conditions carefully before
                    using the &quot;Tumor Scan&quot; website. By accessing or
                    using our website, you agree to be bound by these Terms and
                    Conditions
                  </Translate>
                  .
                </p>
                <ol className="list-decimal pl-6 mt-4">
                  <li className="my-3">
                    <strong className="text-indigo-300">
                      <Translate>Intellectual Property</Translate>:
                    </strong>
                    <br />{" "}
                    <Translate>
                      All content, including text, graphics, images, logos, and
                      software, on the &quot;Tumor Scan&quot; website is
                      protected by intellectual property laws and is the
                      property of Tumor Scan or its licensors. You may not
                      modify, reproduce, distribute, or transmit any content
                      without prior written consent
                    </Translate>
                    .
                  </li>
                  <li className="my-3">
                    <strong className="text-indigo-300">
                      <Translate>Disclaimer of Warranty</Translate>:
                    </strong>
                    <br />{" "}
                    <Translate>
                      The information provided on the &quot;Tumor Scan&quot;
                      website is for general informational purposes only. We do
                      not guarantee the accuracy, completeness, or usefulness of
                      the information. Any reliance you place on such
                      information is strictly at your own risk
                    </Translate>
                    .
                  </li>
                  <li className="my-3">
                    <strong className="text-indigo-300">
                      <Translate>Limitation of Liability</Translate>:
                    </strong>
                    <br />{" "}
                    <Translate>
                      &quot;Tumor Scan&quot;, its affiliates, directors,
                      employees, or agents shall not be liable for any direct,
                      indirect, incidental, special, or consequential damages
                      arising out of or in connection with your use of the
                      website or the information provided
                    </Translate>
                    .
                  </li>
                  <li className="my-3">
                    <strong className="text-indigo-300">
                      <Translate>Third-Party Links</Translate>:
                    </strong>
                    <br />{" "}
                    <Translate>
                      Our website may contain links to third-party websites. We
                      do not endorse or assume any responsibility for the
                      content, privacy practices, or accuracy of these websites.
                      Your use of third-party websites is at your own risk
                    </Translate>
                    .
                  </li>
                  <li className="my-3">
                    <strong className="text-indigo-300">
                      <Translate>Governing Law</Translate>:
                    </strong>
                    <br />{" "}
                    <Translate>
                      These Terms and Conditions shall be governed by and
                      construed in accordance with the laws of [Jurisdiction].
                      Any disputes arising out of or in connection with these
                      Terms and Conditions shall be subject to the exclusive
                      jurisdiction of the courts of [Jurisdiction]
                    </Translate>
                    .
                  </li>
                  <li className="my-3">
                    <strong className="text-indigo-300">
                      <Translate>Changes to the Terms and Conditions</Translate>
                      :
                    </strong>
                    <br />{" "}
                    <Translate>
                      We reserve the right to update or modify these Terms and
                      Conditions at any time. Any changes will be effective
                      immediately upon posting the revised Terms and Conditions
                      on our website. Your continued use of the website after
                      the posting of any changes constitutes your acceptance of
                      the modified Terms and Conditions
                    </Translate>
                    .
                  </li>
                </ol>

                <button
                  className="btn bg-blue-600 my-3"
                  onClick={closeTermsModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
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

        <div className="flex flex-col text-center gap-5">
          <button
            className="btn translation-all bg-indigo-600 ease-in-out hover:bg-indigo-700"
            type="submit"
          >
            <Translate>{loading ? "Loading..." : "Sign Up"}</Translate>
          </button>

          <p className="text-xl">OR</p>

          <button
            className="btn translation-all flex items-center justify-center gap-3 bg-indigo-600 ease-in-out hover:bg-indigo-700"
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
          </button>
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
