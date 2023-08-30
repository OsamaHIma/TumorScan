"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";
import { ProSidebarProvider } from "react-pro-sidebar";
import { LanguageProvider } from "translate-easy";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BreadcrumbProvider>
        <ProSidebarProvider>
          <SessionProvider>
            <UserProvider>
              <LanguageProvider>
                <ToastContainer
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  limit={1}
                  toastClassName="dark:bg-stone-900 dark:text-indigo-100"
                />

                {children}
              </LanguageProvider>
            </UserProvider>
          </SessionProvider>
        </ProSidebarProvider>
      </BreadcrumbProvider>
    </ThemeProvider>
  );
};
export default Providers;
