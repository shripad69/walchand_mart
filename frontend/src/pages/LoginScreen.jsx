"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import config from "../../config"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(`${config.BASE_URL}${config.LOGIN}`, {
        email,
        password,
      })
      const { token } = res.data
      localStorage.setItem("token", token)
      toast.success("Welcome back to Walchand Mart!")
      navigate("/purchase")
    } catch (error) {
      const msg = error.response?.data?.msg || "Something went wrong. Please try again."
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans relative overflow-hidden">
      {/* Background gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-100"></div>
      <div className="absolute inset-0 opacity-10">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDF2Mmgxdi0yaDF2LTFoLTF2LTJoLTF2Mmgxem0tMTEgM2gxdjFoLTF6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Floating animated elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float-medium delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl animate-float-fast delay-1000"></div>

      {/* Header */}
      <header className="relative z-20 bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                WALCHAND MART
              </span>
            </div>

            {/* Back to Home */}
            <button
              onClick={() => navigate("/")}
              className="hidden md:inline-flex items-center px-5 py-2.5 text-gray-300 hover:text-white transition-colors duration-200 font-medium group"
            >
              <svg
                className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-violet-500/10">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Animated logo */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-full blur-xl opacity-80 animate-pulse"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 flex items-center justify-center mx-auto shadow-xl">
                  <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400 text-lg">Sign in to your campus marketplace</p>
              <p className="text-violet-300 text-sm mt-1 font-medium">Walchand College Students Only</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">College Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder="yourname@walchandsangli.ac.in"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder="your secure password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/30 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center"
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
                    Signing you in...
                  </>
                ) : (
                  <>
                    Sign In to Campus
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400 font-medium">New to campus?</span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">{"Don't have an account yet?"}</p>
              <button
                onClick={() => navigate("/signup")}
                className="w-full py-3 px-4 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-white font-bold rounded-xl transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02] active:scale-95 flex items-center justify-center group"
              >
                Create Student Account
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-lg">
              <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-400">Secure login for verified students only</span>
            </div>
          </div>
        </div>
      </main>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
          }
          50% { 
            transform: translateY(-20px) translateX(10px); 
          }
        }
        @keyframes float-medium {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
          }
          50% { 
            transform: translateY(-15px) translateX(-15px); 
          }
        }
        @keyframes float-fast {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
          }
          50% { 
            transform: translateY(-10px) translateX(5px); 
          }
        }
        .animate-float-slow { 
          animation: float-slow 8s ease-in-out infinite; 
        }
        .animate-float-medium { 
          animation: float-medium 6s ease-in-out infinite; 
        }
        .animate-float-fast { 
          animation: float-fast 4s ease-in-out infinite; 
        }
      `}</style>
    </div>
  )
}
