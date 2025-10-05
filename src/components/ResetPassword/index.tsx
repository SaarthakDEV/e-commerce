import axios from 'axios';
import { Mail } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import OTPBoxes from '../OTPBoxes';
import PasswordField from '../PasswordField';

const ResetPassword:React.FC<{ setActiveTab: (value: String) => void }> = ({ setActiveTab }) => {
    const [viewMode, setViewMode] = useState<number>(1)
    const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState({
    email: "",
  });
  const validateField = (name: string, value: string) => {
    let message = "";
    switch (name) {
      case "email":
        if (!value.trim()) {
          message = "Email cannot be empty";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Invalid email address";
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
    await axios.post('http://localhost:3000/api/auth/validate-email', {
        email: formData?.email,
    }).then(response => {
        if (response?.data?.success) {
        toast.success("Email sent successfully");
        setViewMode(2)
      } else {
        toast.error(response?.data?.message || "Something went wrong");
    }}).catch(err => {
        toast.error(err?.message || "Something went wrong");
    })
  };

   if (viewMode === 1) {
    return (
      <div>
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
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
            />
            {error.email && (
              <p className="ml-2 text-red-400 text-sm">{error?.email}</p>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <a
              href="#"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("login");
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Go back to login =&gt;
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Send OTP
          </button>
        </form>
      </div>
    );
  }

  if (viewMode === 2) {
    return (
      <OTPBoxes email={formData?.email} setViewMode={setViewMode}/>
    );
  }

  return (
    <PasswordField email={formData?.email} setActiveTab={setActiveTab}/>
  )
}

export default ResetPassword;