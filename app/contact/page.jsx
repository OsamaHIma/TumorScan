"use client";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MailIcon, Phone, MapPin, ArrowLeftCircleIcon } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Footer from "@/components/Footer";
import Tilt from "react-parallax-tilt";
import { Translate } from "translate-easy";
import Link from "next/link";

const ContactForm = () => {
  const formRef = useRef();
  const [Form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState("");
  const handelChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!e.target.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      setValidated("not-validated");
      toast.error("Please fill in all fields or enter a valid email address.");
      setLoading(false);
      return;
    }

    setValidated("validated");
    emailjs
      .send(
        "service_eflfu3e",
        "template_9rfs3ie",
        {
          to_name: "Osama",
          user_name: Form.name,
          user_email: Form.email,
          user_phone: Form.phone,
          website_name: "Tumor Scan",
          message: Form.message,
        },
        "6vrrdolbRvNzcJ0Xp"
      )
      .then(
        () => {
          setLoading(false);
          toast.success(
            <p>
              <Translate>Thank you</Translate>{" "}
              <span className="font-bold text-orange-400">{Form.name}</span>
              !,{" "}<Translate>we&apos;ve got your message and we&apos;ll reach out to you
                soon</Translate>.
            </p>,
            {
              position: "top-right",
              autoClose: 5700,
            }
          );
          setValidated("");
          setForm({ name: "", email: "", message: "", phone: "" });;
        },
        (err) => {
          setLoading(false);
          toast.error(
            <p>
              <Translate>Sorry</Translate>{" "}
              <span className="font-extrabold text-[#ee524d]">{Form.name}</span>
              <Translate> something went wrong</Translate>.
            </p>
          );
          console.error(err);
        }
      );
  };

  return (
    <>
      <div className="container  relative mx-auto my-24 md:px-6">
        <Link href="/" className="p-3 absolute -top-14 z-20 left-8 md:left-10 rounded-full bg-indigo-500 text-slate-100">
          <ArrowLeftCircleIcon size={32} />
        </Link>
        <motion.div
          className="absolute left-[50%] top-[40%] h-16 w-16 md:w-32 md:h-32 rounded-full border-8 border-indigo-500/10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ scale: 7, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
        ></motion.div>
        <section className="mb-32 text-center">
          <div className="py-12 md:px-12">
            <div className="container mx-auto xl:px-32">
              <div className="grid items-center lg:grid-cols-2">
                <div className="mb-12 md:mt-12 lg:mb-0 lg:mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5, type: "tween" }}
                    viewport={{ once: true }}
                    className="relative z-[1] block rounded-lg bg-[#e9e9e9] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14"
                  >
                    <h3 className="mx-auto text-3xl text-stone-400 dark:text-stone-50 ">
                      <Translate>Contact Us</Translate>.
                    </h3>
                    <form
                      ref={formRef}
                      className={`mt-12 flex flex-col gap-8 ${validated}`}
                      onSubmit={handelSubmit}
                      noValidate
                    >
                      <label className="flex flex-col">
                        <div className="mb-4 rtl:text-right ltr:text-left font-medium text-stone-400 dark:text-stone-100">
                          <span><Translate>Name</Translate>:</span>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={Form.name}
                            autoComplete="on"
                            required
                            // minLength={4}
                            onChange={handelChange}
                            placeholder="Your first and last name"
                            className="placeholder:text-secondary w-full rounded-lg border-none px-6 py-4 font-medium text-stone-400 dark:text-stone-100 outline-none"
                          />
                          {/* <User className="text-theme-color absolute top-4 right-3" /> */}
                        </div>
                      </label>
                      <label className="flex flex-col">
                        <div className="mb-4 rtl:text-right ltr:text-left font-medium text-stone-400 dark:text-stone-100">
                          <span><Translate>Email</Translate>:</span>
                        </div>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={Form.email}
                            required
                            autoComplete="on"
                            onChange={handelChange}
                            placeholder="Whats's your email?"
                            className="placeholder:text-secondary w-full rounded-lg border-none px-6 py-4 font-medium text-stone-400 dark:text-stone-100 outline-none"
                          />
                          {/* <MailIcon className="text-theme-color absolute top-4 right-3" /> */}
                        </div>
                      </label>
                      <label className="flex flex-col">
                        <div className="mb-4 rtl:text-right ltr:text-left font-medium text-stone-400 dark:text-stone-100">
                          <span><Translate >Phone (optional)</Translate>:</span>
                        </div>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={Form.phone}
                            autoComplete="on"
                            onChange={handelChange}
                            placeholder="Whats's your phone number?"
                            className="placeholder:text-secondary w-full rounded-lg border-none px-6 py-4 font-medium text-stone-400 dark:text-stone-100 outline-none"
                          />
                          {/* <MailIcon className="text-theme-color absolute top-4 right-3" /> */}
                        </div>
                      </label>
                      <label className="flex flex-col justify-start">
                        <div className="mb-4 rtl:text-right ltr:text-left font-medium text-stone-400 dark:text-stone-100">
                          <span><Translate translations={{ ar: "الرسالة" }}>Message</Translate>:</span>{" "}
                        </div>
                        <div className="relative">
                          <textarea
                            rows="7"
                            name="message"
                            value={Form.message}
                            required
                            onChange={handelChange}
                            // minLength={6}
                            placeholder="Finally What do you wanna say?"
                            className="placeholder:text-secondary w-full rounded-lg border-none px-6 py-4 font-medium text-stone-400 dark:text-stone-100 outline-none"
                          />
                          {/* <MessagesSquare className="text-theme-color absolute top-4 right-3" /> */}
                        </div>
                      </label>

                      <button
                        type="submit"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="inline-block w-full rounded bg-indigo-800 px-6 pb-2 pt-2.5 font-medium uppercase leading-normal text-stone-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0"
                      >
                        {/* <Translate>{loading ? "Sending..." : "Send"}</Translate> */}
                        {loading ? (<Translate>Sending...</Translate>) : (<Translate translations={{ ar: "أرسل" }} >Send</Translate>)}
                      </button>
                    </form>
                  </motion.div>
                </div>
                <motion.div
                  className="md:mb-12 lg:mb-0"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5, type: "tween" }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-[700px] rounded-lg shadow-lg dark:shadow-black/20">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0088687153616!2d31.131624310760866!3d29.97917512155643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584587ac8f291b%3A0x810c2f3fa2a52424!2sThe%20Great%20Pyramid%20of%20Giza!5e0!3m2!1sen!2sus!4v1692276240518!5m2!1sen!2sus"
                      className="absolute left-0 top-0 h-full w-full rounded-lg"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </div>
                </motion.div>
              </div>
              <div className="flex w-full items-center gap-5 pt-8 flex-wrap" >
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, type: "tween" }}
                  viewport={{ once: true }}
                // className={`my-5 flex flex-col items-center border-b-2 border-gray-300 dark:border-gray-500 px-3 gap-8 py-2 md:items-start shadow-xl rounded-md`}
                >
                  <Tilt
                    className={`flex w-full items-center gap-2 rounded-[20px] bg-indigo-600 px-3 py-4 transition-all`}
                    glareEnable={true}
                    glareBorderRadius="20px"
                    glareColor="#5d56e0"
                  >
                    <div className="rounded-full bg-stone-200 p-3 text-indigo-600 shadow-xl outline-indigo-500 transition-all ease-in">
                      <MailIcon />
                    </div>
                    <div>
                      <h3 className="text left text-stone-100"><Translate>Mail</Translate></h3>
                      <a href="mailto:info@refilex.com" className="text-gray-300">
                        tumorscan@gmail.com
                      </a>
                    </div>
                  </Tilt>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;
