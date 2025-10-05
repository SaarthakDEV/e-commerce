"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';
const LoginForm = dynamic(() => import('@/components/LoginForm'), {
  loading: () => <Loading />
})
const SignupForm = dynamic(() => import('@/components/SignupForm'), {
  loading: () => <Loading />
})

export default function AuthComponent() {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <div className="min-h-screen bg-tertiary flex items-center justify-center p-4">

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div> */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div> */}
      </div>

      {/* Main Auth Container */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-3 border-secondary"></div>
        
        {/* Content */}
        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome
            </h1>
            <p className="text-primary/80">
              {activeTab === 'login' ? 'Sign in to your account' : 'Create your new account'}
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex mb-8 bg-secondary rounded-xl p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 text-primary ${
                activeTab === 'login'
                  ? ' shadow-md'
                  : ' hover:opacity-60'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 text-primary ${
                activeTab === 'signup'
                  ? 'shadow-md'
                  : 'hover:opacity-60'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {activeTab === 'login' ? <LoginForm setActiveTab={setActiveTab}/> : <SignupForm setActiveTab={setActiveTab} />}
          </div>
        </div>
      </div>
    </div>
  );
}