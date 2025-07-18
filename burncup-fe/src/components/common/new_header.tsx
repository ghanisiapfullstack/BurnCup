"use client"

import { useState, useEffect } from "react"
import { User, ChevronDown, LogOut, Trophy, Menu, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { getCurrentSession, logout } from "@/lib/actions/actions"
import { Session } from "next-auth"
import Image from "next/image"

export function Header() {
  const [user, setUser] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter();

  // Simulate loading user data
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true)

      const sessionUser = await getCurrentSession();

      setUser(sessionUser)
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Competition", href: "/competition" },
    { name: "Contact Us", href: "/contact" },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    setIsLoading(true)
    logout()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser(null)
    setIsProfileDropdownOpen(false)
    setIsLoading(false)
    console.log("User logged out")
  }

  return (
    <header className="py-4 bg-[#F4C261] shadow-xl relative z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => handleNavigation("/")}>
            <div className="relative">
              <Image
                src="/images/burncup_logo.png"
                alt="Burncup Logo"
                width={60}
                height={60}
                className="rounded-full shadow-lg bg-gradient-to-r from-[#001F54] to-[#003875] transition-transform duration-300 group-hover:scale-110 lg:w-20 lg:h-20"
              />
              <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-[#001F54] group-hover:text-[#003875] transition-colors duration-300">
                BURNCUP 2025
              </h1>
              <p className="text-xs md:text-sm text-[#001F54]/70 font-medium">Sports Tournament Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="relative px-6 py-3 text-[#001F54] font-bold text-lg transition-all duration-300 group"
              >
                <span className="relative z-10 group-hover:text-[#F4C261] transition-colors duration-300">
                  {item.name}
                </span>
                <div className="absolute inset-0 bg-[#001F54] rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
              </button>
            ))}
          </nav>

          {/* User Profile / Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-xl shadow-lg">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium hidden sm:block">Loading...</span>
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-xl hover:from-[#003875] hover:to-[#001F54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-[#F4C261] rounded-full flex items-center justify-center shadow-inner">
                    <User className="w-4 h-4 text-[#001F54]" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium truncate max-w-32">{user.user?.name}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <p className="text-lg font-bold text-gray-900 truncate">{user.user?.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleNavigation("/dashboard")
                        setIsProfileDropdownOpen(false)
                      }}
                      className="w-full text-left px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#F4C261]/10 hover:to-[#FFD700]/10 flex items-center space-x-3 transition-all duration-200 group"
                    >
                      <Trophy className="w-5 h-5 text-[#F4C261] group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium group-hover:text-[#001F54]">Dashboard</span>
                    </button>
                    <hr className="my-2 mx-4 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-all duration-200 group"
                    >
                      <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavigation("/login")}
                  className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-8 py-3 rounded-xl hover:from-[#003875] hover:to-[#001F54] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Login
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-gradient-to-r from-[#001F54] to-[#003875] text-white p-3 rounded-xl hover:from-[#003875] hover:to-[#001F54] transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`w-6 h-6 absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100">
            <nav className="flex flex-col p-4 space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-[#001F54] hover:text-[#F4C261] font-bold text-lg text-left py-4 px-6 rounded-xl hover:bg-gradient-to-r hover:from-[#001F54] hover:to-[#003875] transition-all duration-300 transform hover:translate-x-2 group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMobileMenuOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                  }}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                </button>
              ))}
              {user && !isLoading && (
                <>
                  <hr className="my-3 border-gray-200" />
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="text-[#001F54] hover:text-[#F4C261] font-bold text-lg text-left py-4 px-6 rounded-xl hover:bg-gradient-to-r hover:from-[#001F54] hover:to-[#003875] transition-all duration-300 flex items-center space-x-3 transform hover:translate-x-2 group"
                  >
                    <Trophy className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
                    <span className="group-hover:text-white transition-colors duration-300">Dashboard</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-200" 
          onClick={() => setIsProfileDropdownOpen(false)} 
        />
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  )
}
