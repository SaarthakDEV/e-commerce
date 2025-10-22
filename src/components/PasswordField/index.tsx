import { useState } from "react";
import { Lock, EyeOff, Eye } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const PasswordField: React.FC<{
  email: string;
  setActiveTab: (value: string) => void;
}> = ({ email, setActiveTab }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateField = (name: string, value: string) => {
    let message = "";
    switch (name) {
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
    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field as keyof typeof formData])
    );
    if (Object.values(error).every((msg) => msg === "")) {
    }
    setIsLoading(true)
    await axios
      .patch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`, {
        email: email,
        password: formData?.password,
      })
      .then((response) => {
        if (response?.data?.success) {
          setActiveTab("login");
          toast.success("Password successfully resetted");
        } else {
          toast.error(response?.data?.message || "Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong");
      });
      setIsLoading(false)
  };

  return (
    <>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData?.password}
          onChange={handleChange}
          className="w-full pl-10 pr-12 py-3 bg-white/10 border-2 border-secondary rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80 cursor-pointer transition-colors"
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
          className="w-full pl-10 pr-12 py-3 bg-white/10 border-2 border-secondary rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80 cursor-pointer transition-colors"
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
        {
        isLoading ? 
        <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 text-primary font-semibold rounded-lg  cursor-wait`}
      >
        Resetting Password...
      </button>
        :
      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 bg-secondary hover:bg-primary hover:text-tertiary text-primary font-semibold rounded-lg cursor-pointer transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
      >
        Reset Password
      </button>
}
    </>
  );
};

export default PasswordField;
