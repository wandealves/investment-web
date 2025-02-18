"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Users,
  HelpCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useApp } from "@/providers/appContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="w-5 h-5" />
  },
  {
    label: "Users",
    href: "/users",
    icon: <Users className="w-5 h-5" />
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />
  },
  {
    label: "Help",
    href: "/help",
    icon: <HelpCircle className="w-5 h-5" />
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile } = useApp();

  return (
    <>
      {/* Mobile Toggle Button */}

      {isMobileOpen ? (
        <button
          type="button"
          onClick={toggleMobile}
          className="fixed top-4 z-50 lg:hidden p-2 rounded-md"
          style={{
            left: 210,
            color: "white"
          }}
        >
          <X className="w-6 h-6" />
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleMobile}
          className="fixed top-4 left-4 z-50 lg:hidden p-0 rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
          w-64 z-40`}
      >
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between h-16 border-b border-gray-800 px-4">
          <h1
            className={`text-xl font-bold transition-opacity duration-300 ${
              isCollapsed ? "lg:opacity-0" : "opacity-100"
            }`}
          >
            Your App
          </h1>
          <button
            onClick={toggleCollapse}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {item.icon}
                    <span
                      className={`transition-all duration-300 ${
                        isCollapsed ? "lg:hidden" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div
            className={`flex items-center gap-4 px-4 text-sm text-gray-400 ${
              isCollapsed ? "lg:justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0" />
            <div
              className={`transition-all duration-300 ${
                isCollapsed ? "lg:hidden" : ""
              }`}
            >
              <p className="font-medium">John Doe</p>
              <p>john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
