"use client"

import type React from "react"

import { CheckCircle, Lock, User } from "lucide-react"
import { useState, useEffect } from "react"
import { getCurrentSession } from "@/lib/actions/actions"
import { getToken } from "next-auth/jwt"

interface ProfileStepProps {
  onComplete: () => void
  isCompleted: boolean
}

export function ProfileStep({ onComplete, isCompleted }: ProfileStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [accountEmail, setAccountEmail] = useState("")
  const [accountUsername, setAccountUsername] = useState("")
  const [formData, setFormData] = useState({
    userType: "binusian", // "binusian" or "non-binusian"
    fullName: "",
    nim: "",
    major: "",
    school: "",
    email: "",
    phone: "",
  })

  // Simulate loading profile data
  useEffect(() => {
    const loadProfileData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const session = await getCurrentSession();
      if (session) {
        const token = await (await fetch("/api/token")).json();
        // If session exists, user is already authenticated
        console.log("User is authenticated:", token.token)
        setAccountEmail(session.user!.email || "")
        setAccountUsername(session.user!.name || "")

        try {
          const res = await fetch("http://localhost:8000/api/protected", {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          });
          console.log("Protected API status:", res.status);
        } catch (err) {
          console.error("Error fetching protected API:", err);
        }
      }

      setIsInitializing(false)
    }

    loadProfileData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    onComplete()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    const baseFields = formData.fullName && formData.email && formData.phone

    if (formData.userType === "binusian") {
      return baseFields && formData.nim && formData.major
    } else {
      return baseFields && formData.school
    }
  }

  if (isCompleted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-600 mb-2">Profile Completed!</h3>
        <p className="text-gray-600">Your profile information has been saved successfully.</p>
      </div>
    )
  }

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Account Information - Greyed Out */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg opacity-60">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="w-4 h-4 text-gray-400" />
              <h4 className="text-lg font-semibold text-gray-500">Account Information</h4>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                Completed
              </span>
            </div>
            <p className="text-sm text-gray-400">Your account details are already set up</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Email Address</label>
              <input
                value={accountEmail}
                disabled
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Username</label>
              <input
                value={accountUsername}
                disabled
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Personal Information - Active */}
        <div className="bg-white border-2 border-blue-200 rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <h4 className="text-lg font-semibold text-blue-900">Personal Information</h4>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Required
              </span>
            </div>
            <p className="text-sm text-gray-600">Complete your personal details to continue</p>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Binusian/Non Binusian Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-900">Binusian/Non Binusian</label>
                <select
                  value={formData.userType}
                  onChange={(e) => handleInputChange("userType", e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                >
                  <option value="binusian">Binusian</option>
                  <option value="non-binusian">Non Binusian</option>
                </select>
              </div>

              {/* Personal Information Section */}
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-blue-900">Personal Information</h5>

                <div className="grid grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* NIM (Binusian) or School (Non-Binusian) */}
                  {formData.userType === "binusian" ? (
                    <div className="space-y-2">
                      <label htmlFor="nim" className="block text-sm font-medium text-gray-700">
                        NIM
                      </label>
                      <input
                        id="nim"
                        value={formData.nim}
                        onChange={(e) => handleInputChange("nim", e.target.value)}
                        placeholder="Enter your NIM"
                        required
                        className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                        School(Non Binusian)
                      </label>
                      <input
                        id="school"
                        value={formData.school}
                        onChange={(e) => handleInputChange("school", e.target.value)}
                        placeholder="Enter your school"
                        required
                        className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Major (Binusian only) */}
                  {formData.userType === "binusian" && (
                    <div className="space-y-2">
                      <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                        Major(Binusian)
                      </label>
                      <input
                        id="major"
                        value={formData.major}
                        onChange={(e) => handleInputChange("major", e.target.value)}
                        placeholder="Enter your major"
                        required
                        className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving Profile..." : "Complete Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
