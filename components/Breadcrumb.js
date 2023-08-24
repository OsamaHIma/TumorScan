"use client";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { Home } from "lucide-react";
import Link from "next/link";

const Breadcrumb = ({ separator = "/", className }) => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <nav
      className={`${className} flex px-5 py-3 w-fit text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700`}
    >
      <ul className="flex items-center gap-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            {index > 0 && <span className="separator">{separator}</span>}
            <Link
              href={breadcrumb.url === "/auth" ? "#" : breadcrumb.url}
              className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              {breadcrumb.label === "Home" && (
                <Home className="mx-1 mb-1 inline" size={21} />
              )}
              {/* {breadcrumb.label === "auth" && (" ")} */}
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
