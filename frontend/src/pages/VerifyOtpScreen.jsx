import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../config";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, phone, password } = location.state || {};
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name || !email || !phone || !password) {
      toast.error("Missing signup details. Redirecting...");
      navigate("/signup");
    }
  }, [name, email, phone, password, navigate]);

  const handleFinalSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${config.BASE_URL}${config.SIGNUP}`, {
        name,
        email,
        phone,
        password,
        otp,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.msg || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Verify OTP</h1>
          <p className="text-gray-400">
            We've sent a 6-digit code to{" "}
            <span className="text-violet-400">{email}</span>
          </p>
        </div>

        <form onSubmit={handleFinalSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
              placeholder="------"
              maxLength="6"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Complete Signup'
            )}
          </button>
        </form>

      </div>
    </div>
  );
}