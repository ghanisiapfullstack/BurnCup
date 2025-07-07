"use client"

import type React from "react"

import { CheckCircle, Lock, User } from "lucide-react"
import { useState, useEffect } from "react"
import { getCurrentSession } from "@/lib/actions/actions"
import { fetchCurrentUser, updateCurrentUser } from "@/controller/user_controller"

interface ProfileStepProps {
  onComplete: () => void
  isCompleted: boolean
}

export function ProfileStep({ onComplete, isCompleted }: ProfileStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [accountEmail, setAccountEmail] = useState("")
  const [accountUsername, setAccountUsername] = useState("")
  const [hasUserProfile, setHasUserProfile] = useState(false)
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
      const session = await getCurrentSession();
      if (session) {
        const token = await (await fetch("/api/token")).json();
        setAccountEmail(session.user!.email || "")
        setAccountUsername(session.user!.name || "")

        // Load user profile data
        try {
          const userProfile = await fetchCurrentUser(token.token);
          setHasUserProfile(!!userProfile)
          setFormData({
            userType: userProfile.binusian ? "binusian" : "non-binusian",
            fullName: userProfile.fullName || "",
            nim: userProfile.nim || "",
            major: userProfile.major || "",
            school: userProfile.school || "",
            email: session.user!.email || "",
            phone: userProfile.phoneNumber || "",
          })
        } catch (error) {
          console.log("Failed to fetch user profile:", error)
        }
      }

      setIsInitializing(false)
    }

    loadProfileData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (hasUserProfile) {
      // If user profile already exists, just proceed
      onComplete()
      return
    }

    setIsLoading(true)
    // Simulate form submission
    try {
      const token = await (await fetch("/api/token")).json();
      const userProfile = {
        binusian: formData.userType === "binusian",
        fullName: formData.fullName,
        phoneNumber: formData.phone,
        email: accountEmail,
        nim: formData.userType === "binusian" ? formData.nim : null,
        major: formData.userType === "binusian" ? formData.major : null,
        school: formData.userType === "non-binusian" ? formData.school : null,
      };
      await updateCurrentUser(token.token, userProfile);
      setIsLoading(false)
      onComplete()
    } catch (error) {
      console.error("Failed to update user profile:", error)
    }
    setIsLoading(false)
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
                  disabled={hasUserProfile}
                  value={formData.userType}
                  onChange={(e) => handleInputChange("userType", e.target.value)}
                  className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
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
                      disabled={hasUserProfile}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        disabled={hasUserProfile}
                        className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        disabled={hasUserProfile}
                        className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        disabled={hasUserProfile}
                        className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      disabled={hasUserProfile}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving Profile..." : hasUserProfile ? "Proceed" : "Complete Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
