"use client";
import React, { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const pathName = usePathname();
  const pathSegments = pathName.split("/").filter((segment) => segment);

  const breadcrumbs = [
    { label: "Home", url: "/" },
    ...pathSegments.map((segment, index) => ({
      label: segment,
      url: `/${pathSegments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <BreadcrumbContext.Provider value={breadcrumbs}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error(
      "useBreadcrumbs must be used within a BreadcrumbProvider component"
    );
  }
  return context;
};
