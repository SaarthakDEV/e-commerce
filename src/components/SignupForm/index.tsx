"use client";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const SignupForm: React.FC<{ setActiveTab: (val: string) => void }> = ({
  setActiveTab,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [error, setError] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (name: string, value: string) => {
    let message = "";
    switch (name) {
      case "fullName":
        if (!value?.trim()) {
          message = "Name cannot be empty";
        }
        break;
      case "email":
        if (!value?.trim()) {
          message = "Email cannot be empty";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Invalid email address";
        }
        break;
      case "password":
        if (!value?.trim()) {
          message = "Password cannot be empty";
        } else if (value?.length < 6) {
          message = "Password must be at least 6 characters";
        }
        break;
      case "confirmPassword":
        if (!value?.trim()) {
          message = "Confirm password cannot be empty";
        } else if (value !== formData?.password) {
          message = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    setError((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Object.keys(formData)?.forEach((field) =>
      validateField(field, formData[field as keyof typeof formData])
    );
    if (Object.values(error)?.every((msg) => msg === "")) {
    }
    await axios
      .post("http://localhost:3000/api/auth/signup", {
        name: formData?.fullName,
        email: formData?.email,
        password: formData?.password,
        role: formData?.role,
      })
      .then((response) => {
        if (response?.data?.success) {
          setActiveTab("login");
          toast.success("User created successfully");
        } else {
          toast.error(response?.data?.message || "Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong");
      });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData?.fullName}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
          required
        />
        {error?.fullName && (
          <p className="ml-2 text-red-400 text-sm">{error?.fullName}</p>
        )}
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData?.email}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
          required
        />
        {error?.email && (
          <p className="ml-2 text-red-400 text-sm">{error?.email}</p>
        )}
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData?.password}
          onChange={handleChange}
          className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
        {error?.password && (
          <p className="ml-2 text-red-400 text-sm">{error?.password}</p>
        )}
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData?.confirmPassword}
          onChange={handleChange}
          className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showConfirmPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
        {error?.confirmPassword && (
          <p className="ml-2 text-red-400 text-sm">{error?.confirmPassword}</p>
        )}
      </div>
      <div className="relative">
        <select
          name="role"
          value={formData?.role}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white 
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm
               appearance-none"
        >
          <option value="customer" className="text-black">
            Customer
          </option>
          <option value="vendor" className="text-black">
            Vendor
          </option>
        </select>
        
        {/* Optional icon for dropdown */}
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between text-sm">
        <a
          href="#"
          role="button"
          onClick={() => setActiveTab("login")}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Already have a account?
        </a>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
      >
        Create Account
      </button>
    </div>
  );
};

export default SignupForm;
