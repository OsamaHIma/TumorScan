"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "translate-easy";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";

const Providers = ({ children }) => {

  return (

    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <UserProvider>
          <LanguageProvider>
            <ToastContainer
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={1}
              toastClassName="dark:bg-stone-800 dark:text-green-100"
            />

            {children}
          </LanguageProvider>
        </UserProvider>
      </SessionProvider>

    </ThemeProvider>

  );
};
export default Providers;
