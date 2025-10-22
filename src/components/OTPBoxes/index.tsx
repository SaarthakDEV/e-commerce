import axios from "axios";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const OTPBoxes: React.FC<{
  email: string;
  setViewMode: (otp: number) => void;
}> = ({ email, setViewMode }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (value?.length > 1) return;

    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs?.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        // Clear current box
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
    // Handle arrow keys
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    // Handle paste
    else if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e?.clipboardData?.getData("text")?.slice(0, 4);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData?.length && i < 4; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      setIsLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/validate-otp`, {
          email,
          otp: otpValue,
        })
        .then((response) => {
          if (response?.data?.success === true) {
            setViewMode(3);
          } else {
            toast.error(response?.data?.message || "Something when wrong");
          }
        })
        .catch((err) => {
          toast.error(err?.message || "Something when wrong");
        });
      setIsLoading(false);
    } else {
      toast.error("Please enter all 4 digits");
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs?.current?.slice(0, 4);
  }, []);

  return (
    <div>
      <div className="relative w-full max-w-md">
        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <p className="text-primary text-sm">
              We've sent a 4-digit verification code to your phone
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center space-x-4 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(index, e?.target?.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`w-16 h-16 text-2xl font-bold text-center rounded-xl border-2 transition-all duration-200 focus:outline-none backdrop-blur-sm ${
                    digit
                      ? "bg-white/20 border-primary text-primary shadow-lg scale-105"
                      : "bg-white/10 border-secondary text-primary hover:border-primary focus:border-primary focus:bg-white/15"
                  }`}
                  maxLength={1}
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 text-primary font-semibold rounded-lg  cursor-wait`}
              >
                Verifying...
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={otp?.join("").length !== 4}
                className={`w-full py-3 px-4 font-semibold rounded-xl transition-all duration-200 transform ${
                  otp.join("").length === 4
                    ? "bg-secondary text-primary hover:bg-primary hover:text-white hover:scale-[1.02] transition-all cursor-pointer shadow-lg border-2 border-secondary"
                    : "bg-white/10 text-secondary cursor-not-allowed border border-secondary"
                }`}
              >
                Verify Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPBoxes;
