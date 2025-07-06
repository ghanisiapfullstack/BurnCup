"use client"

import type React from "react"

import { Chrome, Github, Mail, Facebook } from "lucide-react"
import { useState, useEffect } from "react"
import { log } from "console"
import { getCurrentSession, loginWithProvider } from "@/lib/actions/actions"

interface AuthStepProps {
  onComplete: () => void
  isCompleted: boolean
}

export function AuthStep({ onComplete, isCompleted }: AuthStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  // Simulate loading auth providers data
  useEffect(() => {
    const loadAuthData = async () => {
      const session = await getCurrentSession();
      if (session) {
        // If session exists, user is already authenticated
        onComplete()
      } else {
        // Simulate a delay for initialization
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      setIsInitializing(false)
    }

    loadAuthData()
  }, [])

  const handleOAuthLogin = async (provider: string) => {
    setIsLoading(true)
    // Simulate OAuth login
    await loginWithProvider(provider);
    setIsLoading(false)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate email login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    onComplete()
  }

  if (isCompleted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-600 mb-2">Account Created Successfully!</h3>
        <p className="text-gray-600">You're now signed in and ready to continue.</p>
      </div>
    )
  }

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose your sign-in method</h3>
        <p className="text-gray-600 text-sm">Create an account or sign in to continue with your registration</p>
      </div>

      {!showEmailForm ? (
        <div className="space-y-4">
          <button
            onClick={() => handleOAuthLogin("google")}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleOAuthLogin("github")}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white hover:bg-gray-800 px-4 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>

          <button
            onClick={() => handleOAuthLogin("facebook")}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Facebook className="w-5 h-5" />
            <span>Continue with Facebook</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <button
            onClick={() => setShowEmailForm(true)}
            className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Continue with Email
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Sign in with Email</h4>
            <p className="text-sm text-gray-600">Enter your email and password to continue</p>
          </div>
          <div className="p-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
