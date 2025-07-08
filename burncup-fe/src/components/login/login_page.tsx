"use client"

import { useState } from "react"
import { Chrome, Github, Facebook, Trophy, Loader2 } from "lucide-react"
import { loginWithProvider } from "@/lib/actions/actions"


export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleOAuthLogin = async (provider: string) => {
    setIsLoading(true)
    setLoadingProvider(provider)

    await loginWithProvider(provider, "/dashboard")

    setIsLoading(false)
    setLoadingProvider(null)
  }


  const providers = [
    {
      name: "Google",
      id: "google",
      icon: Chrome,
      bgColor: "bg-white",
      textColor: "text-gray-700",
      borderColor: "border-gray-300",
      hoverColor: "hover:bg-gray-50",
    },
    {
      name: "GitHub",
      id: "github",
      icon: Github,
      bgColor: "bg-gray-900",
      textColor: "text-white",
      borderColor: "border-gray-900",
      hoverColor: "hover:bg-gray-800",
    },
    {
      name: "Facebook",
      id: "facebook",
      icon: Facebook,
      bgColor: "bg-blue-600",
      textColor: "text-white",
      borderColor: "border-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">Welcome Back!</h1>
            <p className="text-blue-800">Sign in to access BURNCUP 2025</p>
          </div>

          {/* Login Content */}
          <div className="px-8 py-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose your sign-in method</h2>
              <p className="text-gray-600 text-sm">Connect with your preferred social account to get started</p>
            </div>

            {/* OAuth Providers */}
            <div className="space-y-4">
              {providers.map((provider) => {
                const Icon = provider.icon
                const isCurrentlyLoading = loadingProvider === provider.id

                return (
                  <button
                    key={provider.id}
                    onClick={() => handleOAuthLogin(provider.id)}
                    disabled={isLoading}
                    className={`
                      w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-medium transition-all duration-200 
                      ${provider.bgColor} ${provider.textColor} border ${provider.borderColor} ${provider.hoverColor}
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transform hover:scale-105 active:scale-95
                      shadow-md hover:shadow-lg
                    `}
                  >
                    {isCurrentlyLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Icon className="w-5 h-5" />}
                    <span>
                      {isCurrentlyLoading ? `Connecting to ${provider.name}...` : `Continue with ${provider.name}`}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By signing in, you agree to our{" "}
                <button className="text-blue-600 hover:text-blue-700 underline">Terms of Service</button> and{" "}
                <button className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</button>
              </p>
            </div>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-amber-800 mb-1">Need Help?</h3>
                <p className="text-xs text-amber-700 mb-2">Having trouble signing in? Contact our support team.</p>
                <button className="text-xs text-blue-600 hover:text-blue-700 underline font-medium">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}