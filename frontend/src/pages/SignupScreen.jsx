"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import config from "../../config"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(`${config.BASE_URL}${config.GET_OTP}`, { email })
      toast.success("OTP sent to your college email!")
      navigate("/verify", {
        state: { name, email, phone, password },
      })
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to send OTP"
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header */}
      <header className="relative z-20 bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5"
                  stroke="currentColor" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                WALCHAND MART
              </span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1" 
                viewBox="0 0 24 24" 
                strokeWidth="2"
                stroke="currentColor" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg mx-auto">
          {/* Card Container */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl shadow-violet-500/10 overflow-hidden">
            {/* Fixed Header */}
            <div className="sticky top-0 bg-gray-800/90 backdrop-blur-md border-b border-gray-700/50 p-6 z-10">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5"
                    stroke="currentColor" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Join Campus</h1>
                <p className="text-gray-400">Create your student account</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <form onSubmit={handleSignup} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5"
                        stroke="currentColor" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* College Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">College Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5"
                        stroke="currentColor" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="student@walchand.ac.in"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">OTP will be sent here</p>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5"
                        stroke="currentColor" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5"
                        stroke="currentColor" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="Create strong password"
                      required
                      minLength="8"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Min 8 characters</p>
                </div>

          

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-500/30 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {loading ? (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send Verification OTP
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 w-5 h-5" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5"
                        stroke="currentColor" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-gray-800/50 text-gray-400">Already have account?</span>
                </div>
              </div>

              {/* Login Link */}
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 px-4 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
              >
                Sign In Instead
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 w-4 h-4" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2"
                  stroke="currentColor" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  { icon: "🛡️", title: "Verified", desc: "Students only" },
                  { icon: "🏫", title: "Campus", desc: "Safe trading" },
                  { icon: "⚡", title: "Quick", desc: "Easy setup" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-gray-800/30 rounded-lg">
                    <div className="text-lg mb-1">{item.icon}</div>
                    <div className="text-xs font-medium text-white">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Security Notice */}
              <div className="text-center pt-4">
                <div className="inline-flex items-center px-3 py-2 bg-gray-800/30 rounded-lg text-xs text-gray-400">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-400 mr-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure & encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 1);
        }
      `}</style>
    </div>
  )
}