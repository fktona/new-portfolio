"use client";
import { submitForm } from "@/actions/formSubmission";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  CloudDownload,
  Github,
  Linkedin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { scaleVariants } from "../../libs/animation";
import Link from "next/link";
import { useLandingCtx } from "../../context/landingCtx";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { z } from "zod";
type FormData = {
  name: string;
  email: string;
  message: string;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});
const initialState = {
  name: "",
  email: "",
  message: "",
  success: false,
};
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-[40px] sm:min-h-[50px] min-w-[90px] w-full sm:w-[180px] group relative rounded-sm border-2 uppercase bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
    >
      <p className="transform relative w-fit mx-auto transition-all duration-200 text-sm sm:text-base">
        {pending ? "SUBMITTING..." : "SUBMIT"}
      </p>
    </button>
  );
}
export default function Contact() {
  const { setShowContacts, showContacts } = useLandingCtx();
  const [state, formAction] = useFormState(submitForm, initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateForm = (formData: FormData) => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as FormData;
    if (validateForm(data)) {
      formAction(formData);
    }
  };

  return (
    <AnimatePresence>
      {showContacts && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0" }}
          exit={{ y: "100%" }}
          transition={{
            damping: 100,
            duration: 0.5,
            type: "keyframes",
          }}
          className="bg-black fixed z-[100] hide-scrollbar overflow-y-auto bottom-0 text-white px-4 sm:px-6 lg:px-[50px] py-8 sm:py-12 lg:py-16 w-full h-[90vh]"
        >
          <div className="flex justify-between w-full items-center border-b pb-4 sm:pb-6 lg:pb-8 border-gray-800">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl uppercase font-extralight">
              Contact
            </h1>
            <button className="" onClick={() => setShowContacts(false)}>
              <ChevronDown
                size={32}
                className="hover:opacity-65 active:scale-95 transition-all duration-150"
              />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 md:mt-0 mt-8 sm:mt-12">
            <div className="space-y-8 sm:space-y-12 lg:space-y-20 py-4 sm:py-6 md:py-10 ">
              <p className="text-base sm:text-lg leading-relaxed uppercase">
                I am always available to bring your ideas to life! Feel free to
                reach out for collaborations, projects, or just to say hello
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 items-center mt-6 sm:mt-8 justify-between">
                <a href="https://github.com/fktona" target="_blank">
                  <motion.button
                    variants={scaleVariants}
                    className="flex items-center justify-center gap-2 group"
                  >
                    <Github
                      size={20}
                      className="text-white/70 hover:text-white group-hover:scale-110 group-hover:text-primaryBlue transition-all duration-150"
                    />
                    <div className="bg-clip-text relative text-base sm:text-lg hover-bg-expand text-transparent bg-gradient-to-r from-primaryBlue to-primaryBlue">
                      <span className="">Github </span>
                      <span className="text-white/70 -z-10 absolute left-0">
                        Github
                      </span>
                    </div>
                  </motion.button>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/fktona">
                  <motion.button
                    variants={scaleVariants}
                    className="flex items-center justify-center gap-2 group"
                  >
                    <Linkedin
                      size={20}
                      className="text-white/70 hover:text-white group-hover:scale-110 group-hover:text-primaryBlue transition-all duration-150"
                    />
                    <div className="bg-clip-text mt-2 relative text-base sm:text-lg hover-bg-expand text-transparent bg-gradient-to-r from-primaryBlue to-primaryBlue">
                      <span className="">Linkedin</span>
                      <span className="text-white/70 -z-10 absolute left-0">
                        Linkedin
                      </span>
                    </div>
                  </motion.button>
                </a>
                <a target="_blank" href="whatsapp://send?phone=+2348135987576">
                  <motion.button
                    variants={scaleVariants}
                    className="flex items-center justify-center gap-2 group"
                  >
                    <Image
                      alt="whatsapp"
                      src="/whatsapp.svg"
                      width={20}
                      height={20}
                    />
                    <div className="bg-clip-text relative text-base sm:text-lg hover-bg-expand text-transparent bg-gradient-to-r from-primaryBlue to-primaryBlue">
                      <span className="">WhatsApp</span>
                      <span className="text-white/70 -z-10 absolute left-0">
                        WhatsApp
                      </span>
                    </div>
                  </motion.button>
                </a>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
                <a href="mailto:adetona.fk@gmail.com" target="_blank">
                  <p className="hover:opacity-100  opacity-70 cursor-pointer active:scale-95 text-sm sm:text-base">
                    Email: adetona.fk@gmail.com
                  </p>
                </a>

                <button className="flex items-center justify-center gap-2 hover:opacity-100 opacity-70 cursor-pointer active:scale-95 text-sm sm:text-base">
                  <CloudDownload size={16} />
                  <span>Resume</span>
                </button>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l min-w-[50%] pt-8  md:pl-8 lg:pl-12 py-4  sm:py-6 md:py-10 border-gray-800">
              <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 font-light uppercase">
                Enquiries
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 border-gray-800 border-b">
                  <label
                    htmlFor="name"
                    className="block sm:min-w-[20%] text-gray-500 mb-1 sm:mb-2 text-sm font-normal"
                  >
                    Name *
                  </label>
                  <div className="grow">
                    <input
                      id="name"
                      aria-label="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="bg-transparent w-full outline-none border-none rounded-none px-0 py-2 text-white placeholder-gray-700 focus:ring-0 focus:border-gray-500 text-sm sm:text-base"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 border-gray-800 border-b">
                  <label
                    htmlFor="email"
                    className="block sm:min-w-[20%] text-gray-500 mb-1 sm:mb-2 text-sm font-normal"
                  >
                    Email *
                  </label>
                  <div className="grow">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="E.g. example@exp.com"
                      className="bg-transparent w-full outline-none border-none rounded-none px-0 py-2 text-white placeholder-gray-700 focus:ring-0 focus:border-gray-500 text-sm sm:text-base"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3 border-gray-800 border-b">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message*"
                    className="bg-transparent w-full outline-none border-none rounded-none px-0 py-2 text-white placeholder-gray-700 resize-none min-h-[100px] focus:ring-0 focus:border-gray-500 text-sm sm:text-base"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs">{errors.message}</p>
                  )}
                </div>
                <SubmitButton />
                {state?.message && (
                  <p
                    className={`text-sm ${
                      state.success ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {state.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
