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

      console.log("secret: ", process.env.AUTH_SECRET)

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
    // In a real app, you'd use Next.js router here
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    setIsLoading(true)

    // Simulate logout API call
    logout()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUser(null)
    setIsProfileDropdownOpen(false)
    setIsLoading(false)

    // In real app, redirect to home or login page
    console.log("User logged out")
  }

  return (
    <header className="py-3 bg-gradient-to-r from-gradient-left-primary to-gradient-right-primary text-[#0F3064] shadow-lg relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Image
                src="/images/burncup_logo.png"
                alt="Burncup Logo"
                width={100}
                height={120}
                className="rounded-full m-3 hidden lg:block"
            />
            <div>
              <h1 className=" text-xl md:text-2xl font-bold text-blue-900">BURNCUP 2025</h1>
              <p className="text-xs md:text-sm text-blue-800 hidden sm:block">Sports Tournament Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="text-blue-900 hover:text-blue-700 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-amber-300"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Profile / Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center space-x-2 bg-blue-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm hidden sm:block">Loading...</span>
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 bg-blue-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-700 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium truncate max-w-32">{user.user?.name}</p>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 md:w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.user?.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleNavigation("/dashboard")
                        setIsProfileDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Trophy className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavigation("/login")}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium"
                >
                  Login
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-amber-300 rounded-lg mt-3 mb-4 py-4 shadow-lg">
            <nav className="flex flex-col space-y-2 px-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-blue-900 hover:text-blue-700 font-medium text-left py-2 px-3 rounded-lg hover:bg-amber-400 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              {user && !isLoading && (
                <>
                  <hr className="my-2 border-amber-400" />
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="text-blue-900 hover:text-blue-700 font-medium text-left py-2 px-3 rounded-lg hover:bg-amber-400 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Backdrop for dropdown */}
      {isProfileDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)} />}
    </header>
  )
}
