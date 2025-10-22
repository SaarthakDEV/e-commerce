import axios from 'axios';
import { Mail } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

const PasswordField = dynamic(() => import('@/components/PasswordField'))

const OTPBoxes = dynamic(() => import('@/components/OTPBoxes'))

const ResetPassword:React.FC<{ setActiveTab: (value: string) => void }> = ({ setActiveTab }) => {
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
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/validate-email`, {
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
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData?.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm"
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
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Go back to login
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-secondary hover:bg-primary hover:text-tertiary text-primary font-semibold rounded-lg cursor-pointer  transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
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