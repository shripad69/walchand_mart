"use client"

import { useState } from "react"
import axios from "axios"
import config from "../../config"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
  ShoppingBag,
  HelpCircle,
  Package,
  Upload,
  User,
  Sparkles,
  DollarSign,
  Tag,
  FileText,
  ImageIcon,
  Loader2,
  MapPin,
  ArrowLeft,
} from "lucide-react"

const categories = ["Books", "Electronics", "Stationery", "Clothing", "Others"]

export default function UploadPurchaseScreen() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    oldPrice: "",
    currentPrice: "",
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e) => {
    setImages([...e.target.files])
  }

  const generateAIDescription = async () => {
    if (!formData.description.trim()) {
      toast.error("Enter a short description before generating AI content")
      return
    }

    setAiLoading(true)
    try {
      const res = await axios.post(`${config.BASE_URL}${config.GEN_PURCHASE_DESC}`, {
        shortDescription: formData.description,
      })

      if (res.data?.detailedDescription) {
        setFormData((prev) => ({
          ...prev,
          description: res.data.detailedDescription,
        }))
        toast.success("AI description generated")
      } else {
        toast.error("AI could not generate description")
      }
    } catch (err) {
      toast.error("Error generating AI response")
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return toast.error("Item name is required")
    if (!formData.description.trim()) return toast.error("Description is required")
    if (!formData.category) return toast.error("Please select a category")
    if (!formData.oldPrice.trim() || isNaN(formData.oldPrice)) return toast.error("Old Price must be a valid number")
    if (!formData.currentPrice.trim() || isNaN(formData.currentPrice))
      return toast.error("Current Price must be a valid number")
    if (images.length === 0) return toast.error("Please upload at least one image")

    setLoading(true)
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) => data.append(key, value))
      images.forEach((file) => data.append("images", file))

      await axios.post(`${config.BASE_URL}${config.UPLOAD_PURCHASE}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Item listed for sale successfully!")
      setFormData({
        name: "",
        description: "",
        category: "",
        oldPrice: "",
        currentPrice: "",
      })
      setImages([])
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans relative overflow-hidden">
      {/* Background gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-100"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDF2Mmgxdi0yaDF2LTFoLTF2LTJoLTF2Mmgxem0tMTEgM2gxdjFoLTF6Ci8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Floating animated elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float-medium delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl animate-float-fast delay-1000"></div>

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800/50 backdrop-blur-md border-r border-gray-700/50 p-6">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                WALCHAND MART
              </span>
            </div>
            <p className="text-gray-400 text-sm">Sell Item Dashboard</p>
          </div>

          <nav className="space-y-3">
            <button
              onClick={() => navigate("/purchase")}
              className="flex items-center w-full text-left px-4 py-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              Purchase Something
            </button>
            <button
              onClick={() => navigate("/found")}
              className="flex items-center w-full text-left px-4 py-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              Lost Something?
            </button>
            <button
              onClick={() => navigate("/found/upload")}
              className="flex items-center w-full text-left px-4 py-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <Package className="w-5 h-5 mr-3" />
              Found Something?
            </button>
            <button
              onClick={() => navigate("/purchase/upload")}
              className="flex items-center w-full text-left px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-violet-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <Upload className="w-5 h-5 mr-3" />
              Sell Something?
            </button>
          </nav>

          {/* Tips Section */}
          <div className="mt-8 p-4 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-xl border border-violet-600/30">
            <h3 className="text-violet-300 font-semibold mb-2">Selling Tips</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Take clear photos of the item</li>
              <li>• Set competitive prices</li>
              <li>• Include detailed descriptions</li>
              <li>• Respond to inquiries quickly</li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto max-h-screen">
          {/* Header */}
          <div className="mb-6 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-4 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/purchase")}
                  className="flex items-center px-3 py-2 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">List Item for Sale</h1>
                  <p className="text-gray-400 text-sm">Help fellow students find great deals</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/account")}
                className="p-2 bg-gradient-to-br from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95"
                title="Go to Profile"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Centered Upload Form Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-violet-400 mr-2" />
                  <h2 className="text-xl font-bold text-white">Item Details</h2>
                </div>
              </div>

              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Item Name */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <Tag className="w-4 h-4 mr-2" />
                      Item Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="What are you selling?"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-sm"
                      required
                    />
                  </div>

                  {/* Description with AI */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <FileText className="w-4 h-4 mr-2" />
                      Description
                    </label>
                    <div className="space-y-3">
                      <div className="relative">
                        <textarea
                          name="description"
                          placeholder="Enter short description and click AI generate (you can edit later)..."
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none text-sm max-h-24 overflow-y-auto"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={generateAIDescription}
                        disabled={aiLoading}
                        className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center text-sm"
                      >
                        {aiLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        {aiLoading ? "Generating..." : "AI Generate"}
                      </button>
                    </div>
                  </div>

                  {/* Category and Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                        <Package className="w-4 h-4 mr-2" />
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer text-sm"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Original Price */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Original Price
                      </label>
                      <input
                        type="number"
                        name="oldPrice"
                        placeholder="Original price"
                        value={formData.oldPrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-sm"
                        required
                      />
                    </div>

                    {/* Selling Price */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Selling Price
                      </label>
                      <input
                        type="number"
                        name="currentPrice"
                        placeholder="Your price"
                        value={formData.currentPrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Images
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-violet-600 file:text-white hover:file:bg-violet-700 file:cursor-pointer cursor-pointer transition-all duration-300 text-sm"
                        required
                      />
                    </div>
                    {images.length > 0 && (
                      <div className="mt-2 p-2 bg-gray-900/30 rounded-lg">
                        <p className="text-xs text-gray-400">
                          <span className="text-violet-400 font-medium">{images.length}</span> image(s) selected
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-gray-700/50">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Upload className="w-5 h-5 mr-2" />
                      )}
                      {loading ? "Uploading..." : "List Item for Sale"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
      `}</style>
    </div>
  )
}