"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import config from "../../config"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { ArrowLeft, ShoppingBag, Package, User, Phone, Mail, DollarSign, Eye, Heart, Share2 } from "lucide-react"

export default function ProductDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = location.state || {}
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isFavorited, setIsFavorited] = useState(false)

  const fetchProductDetails = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authorization token missing or invalid")
      }

      const response = await axios
        .post(
          `${config.BASE_URL}${config.GET_DETAILS}`,
          { id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .catch((error) => {
          if (error.response?.status === 401) {
            localStorage.removeItem("token")
            throw new Error(error.response?.data?.msg || "Invalid or expired token")
          }
          throw error
        })

      setProduct(response.data.data)
      setSelectedImage(response.data.data.imageUrls?.[0] || "")
      setError("")
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch product details"
      setError(errorMessage)
      if (err.message.includes("Authorization token") || err.message.includes("Invalid or expired token")) {
        toast.error(err.message)
        navigate("/")
      } else {
        toast.error(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Authorization token missing or invalid")
      navigate("/")
      return
    }

    if (!id) {
      setError("No product ID found.")
      setLoading(false)
      toast.error("No product ID provided")
      navigate("/")
      return
    }

    fetchProductDetails()
  }, [id, navigate])

  const handleBackClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate("/purchase")
    }
  }

  const handleContactSeller = () => {
    if (product?.seller?.phone) {
      window.open(`tel:${product.seller.phone}`, "_self")
    }
  }

  const handleEmailSeller = () => {
    if (product?.seller?.email) {
      window.open(`mailto:${product.seller.email}`, "_self")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans relative overflow-hidden">
      {/* Background gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-100"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDF2Mmgxdi0yaDF2LTFoLTF2LTJoLTF2Mmgxem0tMTEgM2gxdjFoLTF6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Floating animated elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float-medium delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl animate-float-fast delay-1000"></div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackClick}
                className="flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Product Details</h1>
                  <p className="text-gray-400 text-sm">Campus Marketplace</p>
                </div>
              </div>
            </div>
            {/* <div className="flex space-x-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${
                  isFavorited
                    ? "bg-red-600/20 border border-red-600/30 text-red-400"
                    : "bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white"
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
              </button>
              <button className="p-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95">
                <Share2 className="w-5 h-5" />
              </button>
            </div> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
              <p className="text-gray-400 ml-4">Loading product details...</p>
            </div>
          )}

          {error && (
            <div className="p-8">
              <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 text-center">
                <Package className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <p className="text-red-400 text-lg font-medium mb-2">Error Loading Product</p>
                <p className="text-gray-400">{error}</p>
              </div>
            </div>
          )}

          {product && (
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* LEFT: Image Gallery */}
                <div className="space-y-6">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-700/50">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected product"
                      className="w-full h-96 lg:h-[500px] object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-green-600/80 backdrop-blur-sm text-green-100 text-sm font-medium rounded-full border border-green-500/50">
                        Available
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {product.imageUrls && product.imageUrls.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {product.imageUrls.map((url, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(url)}
                          className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                            selectedImage === url
                              ? "border-violet-500 shadow-lg shadow-violet-500/20"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT: Product Information */}
                <div className="space-y-8">
                  {/* Product Title & Category */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-violet-600/20 text-violet-300 text-sm font-medium rounded-full border border-violet-600/30">
                        {product.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>Product Details</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{product.name}</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span className="text-gray-400 font-medium">Price</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      {product.oldPrice && (
                        <span className="text-gray-500 line-through text-xl">₹{product.oldPrice}</span>
                      )}
                      <span className="text-green-400 font-bold text-3xl">₹{product.currentPrice}</span>
                      {product.oldPrice && (
                        <span className="px-2 py-1 bg-green-600/20 text-green-300 text-sm font-medium rounded-full border border-green-600/30">
                          {Math.round(((product.oldPrice - product.currentPrice) / product.oldPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Seller Information */}
                  {product.seller && (
                    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                      <div className="flex items-center space-x-2 mb-4">
                        <User className="w-5 h-5 text-violet-400" />
                        <span className="text-white font-semibold text-lg">Seller Information</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{product.seller.name}</p>
                            <p className="text-gray-400 text-sm">Verified Seller</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 mt-4">
                          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{product.seller.email}</span>
                          </div>
                          {product.seller.phone && (
                            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{product.seller.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={handleContactSeller}
                      className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95 group"
                    >
                      <Phone className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                      Contact Seller
                    </button>

                    <button
                      onClick={handleEmailSeller}
                      className="w-full flex items-center justify-center px-6 py-4 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 group"
                    >
                      <Mail className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-200" />
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
