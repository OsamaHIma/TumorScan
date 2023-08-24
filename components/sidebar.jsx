"use client";
import { useState, useEffect } from "react";
import { navLinks } from "@/constants";
import Link from "next/link";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { useTheme } from "next-themes";

import { signOut, useSession } from "next-auth/react";
// import LoadingComponent from "@/components/Loading";
import ConfirmModal from "@/components/ConfirmModal";
// import { useLanguage } from "@/context/LanguageContext";
// import Translate from "@/components/Translate";
import { useLanguage } from "translate-easy";
import {Translate} from "translate-easy";
import { toast } from "react-toastify";
import { ArrowLeftCircleIcon, CogIcon } from "lucide-react";

const CustomSidebar = () => {
  const { collapsed } = useProSidebar();
  const { setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userRole, setUserRole] = useState("admin");
  const [token, setToken] = useState("");
  const { selectedLanguage } = useLanguage();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      setUserRole(session.user.userRole);
      setToken(session.user.token);
    }
  }, [session]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: "/auth/login" });
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleSignOut();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSignOutClick = () => {
    setShowModal(true);
  };

  const confirmModal = (
    <ConfirmModal
      message="Are you sure you want to sign out?"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  useEffect(() => {
    if (showModal) {
      toast.warning(confirmModal, {
        className: "dark:bg-slate-800",
        onClose: () => setShowModal(false), // close the modal when the toast is closed
      });
    }
  }, [showModal]);

  return (
    <div className="relative flex !max-w-[256px]">
      <div className="gradient absolute left-0 -z-[1] h-96 w-96 bg-gradient-to-r from-blue-300/25 to-green-600/25 blur-[100px]" />
      <Sidebar
        width="256px"
        defaultCollapsed
        rtl={selectedLanguage === "ar" ? true : false}
      >
        {!collapsed && (
          <div className="sidebarHeader flex justify-start px-4 py-5">
            <Link href="/">
              <img src="/assets/MEDICALTY.png" alt="logo" />
            </Link>
          </div>
        )}

        <Menu>
          {/* Theme mode toggle buttons */}
          {/* <SubMenu icon={<BsMoonStarsFill />} label="Toggle mode">
            <MenuItem onClick={() => setTheme("dark")} icon={<FiMoon />}>
              Dark
            </MenuItem>
            <MenuItem onClick={() => setTheme("light")} icon={<FiSun />}>
              Light
            </MenuItem>
            <MenuItem onClick={() => setTheme("system")} icon={<FiMonitor />}>
              System
            </MenuItem>
          </SubMenu> */}
          {navLinks
            .filter((navItem) => {
              return (
                navItem.access?.includes(userRole) ||
                userRole === "admin" ||
                userRole === "hospital" ||
                userRole === "medical_center"
              );
            })
            .map((navItem, index) => {
              if (navItem.children) {
                return (
                  <SubMenu
                    key={index}
                    icon={navItem.icon}
                    label={<Translate>{navItem.name}</Translate>}
                    title={navItem.name}
                  >
                    {navItem.children.map((submenuItem, submenuIndex) => (
                      <MenuItem
                        key={submenuIndex}
                        component={<Link href={submenuItem.link} />}
                        icon={submenuItem.icon}
                      >
                        <Translate>{submenuItem.name}</Translate>
                      </MenuItem>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <MenuItem
                    key={index}
                    component={<Link href={navItem.id} />}
                    icon={navItem.icon}
                    title={navItem.name}
                  >
                    <Translate>{navItem.name}</Translate>
                  </MenuItem>
                );
              }
            })}
          <div className="mt-7">
            <MenuItem
              component={<Link href="dashboard/settings" />}
              icon={<CogIcon />}
            >
              <Translate>Settings</Translate>
            </MenuItem>
            <MenuItem
              icon={loading ? "Singing out" : <ArrowLeftCircleIcon />}
              onClick={handleSignOutClick}
            >
              <Translate>{loading ? "Signing out..." : "Logout"}</Translate>
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>

      {loading && toast.loading("Signing out...")}
    </div>
  );
};

export default CustomSidebar;
