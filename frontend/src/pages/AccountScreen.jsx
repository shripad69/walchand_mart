"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import config from "../../config";
import { LogOut, User, Package, ShoppingBag, Trash2, HelpCircle, Phone, Calendar } from "lucide-react";

const makeAvatarDataUrl = (name = "User") => {
  const initials = name
    ?.trim()
    ?.split(/\s+/)
    ?.map((n) => n[0])
    ?.slice(0, 2)
    ?.join("")
    ?.toUpperCase() || "U";
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#8b5cf6'/>
        <stop offset='100%' stop-color='#3b82f6'/>
      </linearGradient>
      <filter id='shadow' color-interpolation-filters='sRGB'>
        <feDropShadow dx='0' dy='6' stdDeviation='8' flood-color='rgba(0,0,0,0.35)'/>
      </filter>
    </defs>
    <rect rx='80' width='160' height='160' fill='url(#g)'/>
    <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle'
          font-size='64' font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif'
          fill='white' filter='url(#shadow)'>${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const AccountScreen = () => {
  const [activeTab, setActiveTab] = useState("found");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // NEW: user details
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const navigate = useNavigate();

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token or session expired");
      navigate("/");
    }
  }, []);

  // NEW: Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Invalid token or session expired");
          navigate("/");
          return;
        }

        const infoEndpoint = `${config.BASE_URL}${config.GET_USER_INFO}`;

        const res = await axios.get(infoEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Fetch items based on active tab
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Invalid token or session expired");
          navigate("/");
          return;
        }

        const endpoint =
          activeTab === "found"
            ? `${config.BASE_URL}${config.GET_FOUND_BY_USER}`
            : `${config.BASE_URL}${config.GET_PURCHASE_BY_USER}`;

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setItems(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeTab, navigate]);

  // Helpers
  const safeDate = (iso) => {
    try {
      if (!iso) return "";
      return new Date(iso).toLocaleDateString();
    } catch {
      return "";
    }
  };

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Invalid token or session expired");
        navigate("/");
        return;
      }

      const endpoint =
        activeTab === "found"
          ? `${config.BASE_URL}${config.DELETE_FOUND_BY_ID}`
          : `${config.BASE_URL}${config.DELETE_PURCHASE_BY_ID}`;

      await toast.promise(
        axios.post(
          endpoint,
          { id },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
        {
          loading: "Deleting item...",
          success: () => {
            setItems((prev) => prev.filter((item) => item._id !== id));
            return "Item deleted successfully";
          },
          error: (error) => error.response?.data?.message || "Failed to delete item",
        },
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const avatarSrc = makeAvatarDataUrl(user?.name || "User");

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

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Animated Avatar */}
              <div className="relative">
                <div className="avatar-ring">
                  <div className="avatar-cutout">
                    <img
                      src={avatarSrc}
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover avatar-img"
                    />
                  </div>
                </div>
                <div className="avatar-glow"></div>
              </div>

              {/* User details */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {userLoading ? "Loading..." : user?.name || "User"}
                </h1>
                <div className="text-gray-300">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <User className="w-4 h-4 text-violet-300" />
                      <span className="truncate max-w-[240px]">{userLoading ? "…" : user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Phone className="w-4 h-4 text-violet-300" />
                      <span>{userLoading ? "…" : user?.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-violet-300" />
                      <span>Joined {userLoading ? "…" : safeDate(user?.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 hover:border-red-600/50 text-red-400 hover:text-red-300 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl shadow-xl">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("found")}
              className={`flex items-center px-6 py-3 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${
                activeTab === "found"
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg hover:shadow-violet-500/20"
                  : "bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white"
              }`}
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              Found Items
            </button>
            <button
              onClick={() => setActiveTab("purchase")}
              className={`flex items-center px-6 py-3 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${
                activeTab === "purchase"
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg hover:shadow-violet-500/20"
                  : "bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white"
              }`}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              My Purchases
            </button>
          </div>
        </div>

        {/* Items Content */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-8 rounded-2xl shadow-xl">
          <div className="flex items-center mb-6">
            {activeTab === "found" ? (
              <HelpCircle className="w-6 h-6 text-violet-400 mr-3" />
            ) : (
              <ShoppingBag className="w-6 h-6 text-violet-400 mr-3" />
            )}
            <h2 className="text-2xl font-bold text-white">
              {activeTab === "found" ? "Your Found Items" : "Your Listed Items"}
            </h2>
            {!loading && <span className="ml-auto text-gray-400 text-sm">{items.length} items</span>}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
              <p className="text-gray-400 ml-4">Loading your items...</p>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                No {activeTab === "found" ? "found items" : "purchases"} to display
              </p>
              <p className="text-gray-500 text-sm">Your items will appear here once you add them</p>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 transform hover:scale-[1.02] group relative"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-3 right-3 z-10 p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Item Image */}
                  {item.imageUrls?.length > 0 && (
                    <div className="relative overflow-hidden">
                      <img
                        src={item.imageUrls[0] || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 left-3">
                        <div className="px-2 py-1 bg-green-600/80 backdrop-blur-sm text-green-100 text-xs font-medium rounded-full border border-green-500/50">
                          {activeTab === "found" ? "Found" : "For Sale"}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-400 mb-3 line-clamp-2 text-sm">{item.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-violet-600/20 text-violet-300 text-xs font-medium rounded-full border border-violet-600/30">
                        {item.category}
                      </span>
                    </div>

                    {/* Price Details (for purchases only) */}
                    {activeTab === "purchase" && (
                      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Original Price:</span>
                          <span className="text-gray-500 line-through">₹{item.oldPrice}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Selling Price:</span>
                          <span className="text-green-400 font-bold">₹{item.currentPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Discount:</span>
                          <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs font-medium rounded-full border border-green-600/30">
                            {Math.round((1 - item.currentPrice / item.oldPrice) * 100)}% OFF
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
        /* NEW: avatar ring + glow */
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .avatar-ring {
          position: relative;
          width: 5.5rem; /* 88px */
          height: 5.5rem;
          border-radius: 9999px;
          padding: 2px;
          background: conic-gradient(#8b5cf6, #3b82f6, #8b5cf6);
          animation: spin-slower 12s linear infinite;
        }
        .avatar-cutout {
          border-radius: 9999px;
          height: 100%;
          width: 100%;
          background: #0b1020;
          padding: 3px;
        }
        .avatar-img {
          transition: transform 300ms ease;
        }
        .avatar-img:hover {
          transform: scale(1.04);
        }
        .avatar-glow {
          position: absolute;
          inset: -8px;
          border-radius: 9999px;
          background: radial-gradient(60% 60% at 50% 50%, rgba(139,92,246,0.25), rgba(59,130,246,0.0));
          filter: blur(12px);
          opacity: 0.8;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default AccountScreen;
