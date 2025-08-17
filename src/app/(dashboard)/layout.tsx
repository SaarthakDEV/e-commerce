"use client"
import ClientToaster from '@/components/ClientToaster'
import React, { useEffect, useState } from 'react'
import '@/app/globals.css'
import myHttp from '@/config/axios.config'



const layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const navItems = [
    { name: 'Dashboard', href: '#', icon: '📊' },
    { name: 'Users', href: '#', icon: '👥' },
    { name: 'Analytics', href: '#', icon: '📈' },
    { name: 'Projects', href: '#', icon: '📁' },
    { name: 'Messages', href: '#', icon: '💬' },
    { name: 'Settings', href: '#', icon: '⚙️' },
  ]

  useEffect(() => {
    console.log("user information")
    myHttp.get('/auth/me').then(response => console.log(response)).catch(err => {
    console.log(err.message)
})
  }, [])

  return (
    <html>
      <body>
        <ClientToaster />
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50 transition-opacity"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-sm font-bold">MA</span>
                </div>
                <h1 className="text-lg font-semibold">My App</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </nav>

            {/* User Profile Section */}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Header */}
            <header className="h-16 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
              {/* Left side */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
              <div className="relative flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="absolute top-15 -left-10 w-28 p-2 bg-white">
                    <p>Logout</p>
                </div>
              </div>
            </div>
              
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
              <div className="max-w-7xl mx-auto bg-white">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

export default layout