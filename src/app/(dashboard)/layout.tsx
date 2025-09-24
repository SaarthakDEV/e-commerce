"use client";
import ClientToaster from "@/components/ClientToaster";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { getUserInfo, logout } from "@/utils/api/auth";
import useStore from "@/utils/newStore";
import { usePathname } from "next/navigation";
import { navItems_customer, navItems_vendor } from "@/libs/constant";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: "User Account",
    role: "",
    email: "",
    createdAt: "",
  });
  const { setCurrentUser, currentUser } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    retrieveUserInfo();
  }, []);

  const retrieveUserInfo = async () => {
    try{
      const { id, role, name, createdAt, email } = (await getUserInfo()).data
        .data;
      setCurrentUser(id, name, email, role, createdAt);
      setUser({
        name,
        role,
        email,
        createdAt,
      });
    }catch(err: any){
      toast.error(err.message)
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <html>
      <body>
        <ClientToaster />
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50 transition-opacity"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-sm font-bold">K</span>
                </div>
                <h1 className="text-lg font-semibold">Kartly</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {user.role === "customer"
                ? navItems_customer.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 ${
                        pathname == item.href
                          ? "text-blue-600 bg-blue-50 "
                          : "text-gray-700 "
                      }transition-all duration-200 group`}
                    >
                      <span className="font-medium">{item.name}</span>
                    </a>
                  ))
                : navItems_vendor.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 ${
                        pathname == item.href
                          ? "text-blue-600 bg-blue-50 "
                          : "text-gray-700 "
                      }transition-all duration-200 group`}
                    >
                      <span className="font-medium">{item.name}</span>
                    </a>
                  ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-16 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <div className="hidden md:block">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Dashboard
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Welcome back! Here's what's happening.
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="relative flex items-center space-x-3 p-2 rounded-xl   transition-colors cursor-pointer">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold"
                  >
                    {user.name
                      .split(" ")
                      .map((str) => str.charAt(0))
                      .join("")}
                  </div>
                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                      />

                      <div className="absolute top-0  -left-60 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
                        {/* User Info Section */}
                        <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                              {user.name
                                .split(" ")
                                .map((str) => str.charAt(0))
                                .join("")}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {user.name}
                              </h3>
                              <p className="text-xs text-gray-600 truncate">
                                {user.role}
                              </p>
                              <p className="text-xs text-gray-500 truncate mt-1">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <div className="my-2 border-t border-gray-100"></div>
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-150 flex items-center space-x-3 group"
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                              <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 group-hover:text-red-600">
                                Sign out
                              </div>
                              <div className="text-xs text-gray-500">
                                Sign out of your account
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
              <div className="relative max-w-7xl mx-auto bg-white">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default layout;
