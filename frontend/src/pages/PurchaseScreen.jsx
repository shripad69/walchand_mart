"use client"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import config from "../../config"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Search, Filter, ShoppingBag, Package, Eye, User, Upload, HelpCircle, Menu, X } from "lucide-react"

const categories = ["Books", "Electronics", "Stationery", "Clothing", "Others"]

export default function Purchase() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const debounceRef = useRef(null)
  const navigate = useNavigate()

  const checkAuthAndFetch = async (apiCall) => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Authorization token missing or invalid")
      navigate("/")
      return null
    }

    try {
      const response = await apiCall(token)
      return response
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        const errorMsg = err.response?.data?.msg || "Invalid or expired token"
        toast.error(errorMsg)
        navigate("/")
        return null
      }
      throw err
    }
  }

  const fetchAllProducts = async () => {
    setLoading(true)
    try {
      const response = await checkAuthAndFetch((token) =>
        axios.get(`${config.BASE_URL}${config.GET_ALL_PRODUCTS}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      )
      if (response) {
        setProducts(response.data.data || [])
        setError("")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryFilter = async (selectedCategory) => {
    setCategory(selectedCategory)
    if (!selectedCategory) {
      fetchAllProducts()
      return
    }

    setLoading(true)
    try {
      const response = await checkAuthAndFetch((token) =>
        axios.post(
          `${config.BASE_URL}${config.GET_PRUCHASE_BY_CATEGORY}`,
          { category: selectedCategory },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      )
      if (response) {
        setProducts(response.data.data || [])
        setError("")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Filter failed")
      toast.error(err.response?.data?.message || "Filter failed")
    } finally {
      setLoading(false)
    }
  }

  const handleLiveSearch = async (query) => {
    if (!query.trim()) {
      if (category) handleCategoryFilter(category)
      else fetchAllProducts()
      return
    }

    setLoading(true)
    try {
      const response = await checkAuthAndFetch((token) =>
        axios.post(
          `${config.BASE_URL}${config.GET_SEARCH}`,
          { query },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      )
      if (response) {
        setProducts(response.data.data || [])
        setError("")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Search failed")
      toast.error(err.response?.data?.message || "Search failed")
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
    fetchAllProducts()
  }, [navigate])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      handleLiveSearch(searchQuery)
    }, 1000)
    return () => clearTimeout(debounceRef.current)
  }, [searchQuery])

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

      <div className="flex min-h-screen relative z-10">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-800/50 backdrop-blur-md border-r border-gray-700/50 transition-transform duration-300 ease-in-out p-6`}
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  WALCHAND MART
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 text-sm">Campus Marketplace</p>
          </div>

          <nav className="space-y-3">
            <button
              onClick={() => navigate("/purchase")}
              className="flex items-center w-full text-left px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-violet-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
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
              className="flex items-center w-full text-left px-4 py-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <Upload className="w-5 h-5 mr-3" />
              Sell Something?
            </button>
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-xl border border-violet-600/30">
            <h3 className="text-violet-300 font-semibold mb-2">Marketplace Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Products:</span>
                <span className="text-violet-300 font-medium">{products.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Active:</span>
                <span className="text-blue-300 font-medium">24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-y-auto max-h-screen">
          {/* Header */}
          <div className="mb-8 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Campus Marketplace</h1>
                  <p className="text-gray-400">Discover amazing deals from fellow students</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/account")}
                className="p-3 bg-gradient-to-br from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95"
                title="Go to Profile"
              >
                <User className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={category}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-violet-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-6">
              <Package className="w-6 h-6 text-violet-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Available Products</h2>
              {!loading && <span className="ml-auto text-gray-400 text-sm">{products.length} products found</span>}
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
                <p className="text-gray-400 ml-4">Loading products...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-4 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No products found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search or check back later</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 transform hover:scale-[1.02] group"
                >
                  {product.imageUrls?.[0] && (
                    <div className="relative overflow-hidden">
                      <img
                        src={product.imageUrls[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3">
                        <div className="px-2 py-1 bg-green-600/80 backdrop-blur-sm text-green-100 text-xs font-medium rounded-full border border-green-500/50">
                          Available
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-400 mb-3 line-clamp-2 text-sm">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-violet-600/20 text-violet-300 text-xs font-medium rounded-full border border-violet-600/30">
                        {product.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {product.oldPrice && (
                          <span className="text-gray-500 line-through text-sm">₹{product.oldPrice}</span>
                        )}
                        <span className="text-green-400 font-bold text-lg">₹{product.currentPrice}</span>
                      </div>
                    </div>

                    {product.seller && (
                      <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <p className="text-gray-300 text-sm">
                          <span className="text-gray-500">Seller:</span> {product.seller.name}
                        </p>
                        <p className="text-gray-400 text-xs">{product.seller.email}</p>
                      </div>
                    )}

                    <button
                      onClick={() => navigate("/purchase/details", { state: { id: product._id } })}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/20 transform hover:scale-[1.02] active:scale-95 group"
                    >
                      <Eye className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
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
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  )
}
