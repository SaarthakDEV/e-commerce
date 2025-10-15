import { getUserInfo } from '@/utils/api/auth';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const LoginForm:React.FC<{ setActiveTab: (value: string) => void }> = ({ setActiveTab }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({
    email: '',
    password: ''
  });

  const validateField = (name: string, value: string) => {
    let message = '';
    if (name === 'email') {
      if (!value?.trim()) {
        message = 'Email cannot be empty';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Invalid email format';
      }
    }
    if (name === 'password') {
      if (!value?.trim()) {
        message = 'Password cannot be empty';
      } else if (value?.length < 6) {
        message = 'Password must be at least 6 characters';
      }
    }
    setError((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true)
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field as keyof typeof formData]);
    });
    if (Object.values(error).every((msg) => msg === '')) {
    }
    await axios.post('http://localhost:3000/api/auth/login', {
        email: formData?.email,
        password: formData?.password,
    }).then(async response => {
        if (response?.data?.success) {
        toast.success("User Loggedin");
        const role = (await getUserInfo())?.data?.data?.role;
        if(role === 'customer'){
          window.location.href = '/dashboard/customer'
        }else if(role === 'vendor'){
          window.location.href = '/dashboard/vendor'
        }
      } else {
        toast.error(response?.data?.message || "Something went wrong");
    }}).catch(err => {
        toast.error(err?.message || "Something went wrong");
    })
    setIsLoading(false)
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Email Field */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData?.email}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-secondary rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
        />
        {error?.email && <p className="ml-2 text-red-400 text-sm">{error?.email}</p>}
      </div>
      {/* Password Field */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData?.password}
          onChange={handleChange}
          className="w-full pl-10 pr-12 py-3 bg-white/10 border-2 border-secondary rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80 cursor-pointer transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
        {error?.password && <p className="ml-2 text-red-400 text-sm">{error?.password}</p>}
      </div>
      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <a href="#" role='button' onClick={() => setActiveTab('signup')} className="text-primary hover:text-primary/80 transition-colors">
          Create new account
        </a>
        <a href="#" role='button' onClick={() => setActiveTab('reset')} className="text-primary hover:text-primary/80 transition-colors">
          Forgot password?
        </a>
      </div>
      {/* Submit Button */}
      {
        isLoading ? 
        <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 text-primary font-semibold rounded-lg  cursor-wait`}
      >
        Logging In...
      </button>
        :
        <button
        type="submit"
        className="w-full py-3 px-4 bg-secondary hover:bg-primary hover:text-tertiary text-primary font-semibold cursor-pointer rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
      >
        Login
      </button>
      }
    </form>
  );
};

export default LoginForm;
