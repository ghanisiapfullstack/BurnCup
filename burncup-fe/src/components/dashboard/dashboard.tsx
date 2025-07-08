"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Calendar,
  Users,
  Trophy,
  QrCode,
  Copy,
  CheckCircle,
  User,
  Crown,
  MapPin,
  ChevronDown,
  ChevronUp,
  Edit,
  LogOut,
  X,
  Save,
  Phone,
  GraduationCap,
  School,
} from "lucide-react"

import { User as UserModel } from "@/model/user_model"
import { Team } from "@/model/team_model"
import { fetchCurrentUser, updateCurrentUser } from "@/controller/user_controller"
import { getCurrentSession, logout } from "@/lib/actions/actions"
import { fetchCurrentTeams } from "@/controller/team_controller"
import { Session } from "next-auth"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "../common/toast/toast-context"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function CountdownTimer({ targetDate, label }: { targetDate: string; label: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
        setIsExpired(false)
      } else {
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <div className="text-center p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-semibold text-sm md:text-base">{label} has ended</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <div className="grid grid-cols-4 gap-1 md:gap-2">
        <div className="bg-blue-600 text-white p-1.5 md:p-2 rounded-lg">
          <div className="text-sm md:text-lg font-bold">{timeLeft.days}</div>
          <div className="text-xs">Days</div>
        </div>
        <div className="bg-blue-600 text-white p-1.5 md:p-2 rounded-lg">
          <div className="text-sm md:text-lg font-bold">{timeLeft.hours}</div>
          <div className="text-xs">Hours</div>
        </div>
        <div className="bg-blue-600 text-white p-1.5 md:p-2 rounded-lg">
          <div className="text-sm md:text-lg font-bold">{timeLeft.minutes}</div>
          <div className="text-xs">Minutes</div>
        </div>
        <div className="bg-blue-600 text-white p-1.5 md:p-2 rounded-lg">
          <div className="text-sm md:text-lg font-bold">{timeLeft.seconds}</div>
          <div className="text-xs">Seconds</div>
        </div>
      </div>
    </div>
  )
}

function QRCodePayment({ amount, teamCode }: { amount: string; teamCode: string }) {
  const [copied, setCopied] = useState(false)

  const copyTeamCode = () => {
    navigator.clipboard.writeText(teamCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
      <div className="text-center mb-4">
        <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Payment QR Code</h4>
        <p className="text-sm text-gray-600">Scan to pay registration fee: {amount}</p>
      </div>

      {/* QR Code Placeholder */}
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <QrCode className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">QR Code</p>
            <p className="text-xs text-gray-400">Payment Gateway</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Team Code for Reference:</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-lg font-mono font-semibold text-sm md:text-base">
            {teamCode}
          </span>
          <button onClick={copyTeamCode} className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
            {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
      </div>
    </div>
  )
}

function TeamMemberCard({ member, isLeader = false }: { member: UserModel; isLeader?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          {isLeader ? <Crown className="w-6 h-6 text-yellow-600" /> : <User className="w-6 h-6 text-blue-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-900 truncate">{member.fullName}</h4>
            {isLeader && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                Leader
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-1">{member.email}</p>
          <p className="text-xs text-gray-600 mb-2">{member.phoneNumber}</p>

          {member.binusian == true ? (
            <div className="space-y-1">
              <p className="text-xs text-blue-600">
                <span className="font-medium">NIM:</span> {member.nim}
              </p>
              <p className="text-xs text-blue-600">
                <span className="font-medium">Major:</span> {member.major}
              </p>
            </div>
          ) : (
            <p className="text-xs text-green-600">
              <span className="font-medium">School:</span> {member.school}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function EditProfileModal({
  user,
  userEmail,
  isOpen,
  onClose,
  onSave,
}: {
  user: UserModel
  userEmail: string
  isOpen: boolean
  onClose: () => void
  onSave: (userData: UserModel) => void
}) {
  const [formData, setFormData] = useState(user)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setFormData(user)
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      const token = await (await fetch("/api/token")).json();
      formData.email = userEmail; // Ensure email is set from props
      await updateCurrentUser(token.token, formData);
      setIsLoading(false)
      onSave(formData)
      onClose()
    } catch (error) {
      console.error("Failed to update user profile:", error)
    }

    onSave(formData)
    setIsLoading(false)
    onClose()
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* User Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">User Type</label>
            <select
              value={formData.binusian ? "binusian" : "non-binusian"}
              onChange={(e) => handleInputChange("binusian", e.target.value == "binusian")}
              disabled = {user != emptyUser}
              className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 text-sm md:text-base"
            >
              <option value="binusian">Binusian</option>
              <option value="non-binusian">Non Binusian</option>
            </select>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                placeholder="Enter your phone number"
                required
                className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              />
            </div>

            {/* Conditional Fields */}
            {formData.binusian === true ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="nim" className="block text-sm font-medium text-gray-700">
                    NIM
                  </label>
                  <input
                    id="nim"
                    value={formData.nim!}
                    onChange={(e) => handleInputChange("nim", e.target.value)}
                    placeholder="Enter your NIM"
                    required
                    className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                    Major
                  </label>
                  <input
                    id="major"
                    value={formData.major!}
                    onChange={(e) => handleInputChange("major", e.target.value)}
                    placeholder="Enter your major"
                    required
                    className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                  School
                </label>
                <input
                  id="school"
                  value={formData.school!}
                  onChange={(e) => handleInputChange("school", e.target.value)}
                  placeholder="Enter your school"
                  required
                  className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 md:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || formData == user}
              className="w-full sm:w-auto px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const emptyUser: UserModel = {
  fullName: "-",
  email: "-",
  phoneNumber: "-",
  binusian: false,
  nim: "-",
  major: "-",
  school: "-",
};

export function Dashboard() {
  const [competitions, setCompetitions] = useState<Team[] | null>(null)
  const [user, setUser] = useState<UserModel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedCompetitions, setExpandedCompetitions] = useState<Set<string>>(new Set())
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)

  const router = useRouter()
  const {showError} = useToast();

  

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboard = async () => {
      const session = await getCurrentSession();
      setSession(session);
      if (session) {
        const token = await (await fetch("/api/token")).json();
        // Load user profile data

        try {
          const userProfile = await fetchCurrentUser(token.token);
          setUser(userProfile);

        } catch (error: any) {
          if (error.response) {
            const errorMessage = error.response.data.error;
            if (errorMessage == "User not found") {
              setUser(emptyUser);
            } else {
              showError("Failed to fetch user profile", errorMessage);
            }
          } else if (error.request) {
            console.error("Failed to fetch user profile: No response received", error.request);
          } else {
            console.error("Failed to fetch user profile:", error.message);
          }
        }

        try {
          const comps = (await fetchCurrentTeams(token.token) as Team[]) ?? [];
          comps.forEach((competition) => {
            if (competition.members == null) {
              competition.members = [];
            }
          });
          setCompetitions(comps ?? []);
          setIsLoading(false);
        } catch (error: any) {
          if (error.response) {
            const errorMessage = error.response.data.error;
            showError("Failed to fetch competition", errorMessage);
          } else if (error.request) {
            console.error("Failed to fetch competition: No response received", error.request);
          } else {
            console.error("Failed to fetch competition:", error.message);
          }
        }
    }
  }
  loadDashboard();
}, [])

  const toggleCompetition = (competitionId: string) => {
    const newExpanded = new Set(expandedCompetitions)
    if (newExpanded.has(competitionId)) {
      newExpanded.delete(competitionId)
    } else {
      newExpanded.add(competitionId)
    }
    setExpandedCompetitions(newExpanded)
  }

  const expandAll = () => {
    setExpandedCompetitions(new Set(competitions?.map((c) => c.id)))
  }

  const collapseAll = () => {
    setExpandedCompetitions(new Set())
  }

  const handleLogout = () => {
    logout()
  }

  const handleSaveProfile = (userData: UserModel) => {
    setUser(userData)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Dashboard...</h3>
          <p className="text-gray-500">Fetching your competition data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Sports Dashboard</h1>
              <p className="text-sm md:text-base text-blue-800">
                Welcome back, <span className="font-semibold">{session?.user?.name}</span>!
              </p>
              <p className="text-sm md:text-base text-blue-800 hidden md:block">
                Here are your registered competitions across different sports.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-left sm:text-right">
                <div className="inline-block bg-blue-900 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold">
                  Burncup 2025 Participant
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm md:text-base"
              >
                <LogOut className="w-3 h-3 md:w-4 md:h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-4 md:py-8 px-4">
        {/* Mobile Profile Card - Only visible on mobile */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src={session?.user?.image || "/default-profile.png"}
                  alt="Profile Picture"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">{user?.fullName}</h3>
                <p className="text-sm text-gray-600 truncate">{session?.user?.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      user?.binusian === true ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user?.binusian === true ? "Binusian" : "Non-Binusian"}
                  </span>
                  <span className="text-xs text-gray-500">{competitions?.length} Competitions</span>
                </div>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Profile Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                  src={session?.user?.image || "/default-profile.png"}
                  alt="Profile Picture"
                  width={64}
                  height={64}
                  className="w-20 h-20 rounded-full object-cover"
                />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{user?.fullName}</h3>
                <p className="text-sm text-gray-600 mb-2">{session?.user?.email}</p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user?.binusian === true ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {user?.binusian === true ? "Binusian" : "Non-Binusian"}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{user?.phoneNumber}</span>
                </div>

                {user?.binusian === true ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">NIM: {user.nim}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{user.major}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <School className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{user?.school}</span>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Trophy className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{competitions?.length} Competitions</span>
                </div>
              </div>

              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>{user == emptyUser ? 'Complete Profile' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Competitions Section */}
          <div className="lg:col-span-3">
            {competitions?.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <Trophy className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No Competitions Yet</h3>
                <p className="text-sm md:text-base text-gray-500 mb-6">
                  You haven't registered for any competitions yet.
                </p>
                <button 
                onClick={() => router.push("/competition")}
                className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base">
                  Browse Competitions
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Accordion Controls */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    My Competitions ({competitions?.length})
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={expandAll}
                      className="text-xs md:text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 md:px-3 md:py-1 rounded-lg transition-colors"
                    >
                      Expand All
                    </button>
                    <button
                      onClick={collapseAll}
                      className="text-xs md:text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-1 md:px-3 md:py-1 rounded-lg transition-colors"
                    >
                      Collapse All
                    </button>
                  </div>
                </div>

                {/* Accordion Items */}
                {competitions?.map((competition) => {
                  const isExpanded = expandedCompetitions.has(competition.id)

                  return (
                    <div
                      key={competition.id}
                      className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200"
                    >
                      {/* Accordion Header - Always Visible */}
                      <div
                        className="bg-blue-600 text-white p-3 md:p-4 cursor-pointer hover:bg-blue-700 transition-colors"
                        onClick={() => toggleCompetition(competition.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                              <h3 className="text-lg md:text-xl font-bold truncate">{competition.competition.name}</h3>
                              <div className="flex flex-wrap gap-1">
                                <span className="bg-blue-500 text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">
                                  {competition.competition.competitionType}
                                </span>
                                <span className="bg-blue-800 text-blue-200 px-2 py-0.5 rounded-full text-xs font-medium">
                                  {competition.competition.category}
                                </span>
                              </div>
                            </div>

                            {/* Mobile-specific info */}
                            <div className="mt-2 sm:hidden">
                              <div className="flex items-center space-x-2 text-xs text-blue-100">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate">{competition.competition.venue}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            {/* Desktop info - hidden on mobile */}
                            <div className="hidden sm:block text-right text-sm">
                              <div className="flex items-center space-x-2 mb-1">
                                <MapPin className="w-3 h-3" />
                                <span className="text-blue-100">{competition.competition.venue}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Trophy className="w-3 h-3" />
                                <span className="text-blue-100">{competition.competition.registrationfee}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  competition.isPaid === false
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {competition.isPaid === false ? "Pending" : "Paid"}
                              </span>

                              <div className="flex items-center">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-blue-200" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-blue-200" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Content - Expandable */}
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isExpanded ? "max-h-none opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        <div className="p-4 md:p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                            {/* Countdown Timers */}
                            <div className="space-y-4 md:space-y-6">
                              <CountdownTimer
                                targetDate={competition.competition.registrationEndDate}
                                label="Registration Ends In"
                              />
                              <CountdownTimer
                                targetDate={competition.competition.competitionStartDate}
                                label="Competition Starts In"
                              />
                            </div>

                            {/* Payment QR Code */}
                            <div className="order-last lg:order-none">
                              <QRCodePayment amount={competition.competition.registrationfee.toString()} teamCode={competition.teamCode} />
                            </div>

                            {/* Team Information */}
                            <div className="space-y-4">
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-base md:text-lg font-semibold text-blue-900">
                                    {competition.competition.maxMembers == null
                                      ? "Participant Info"
                                      : "Team Information"}
                                  </h4>
                                  <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                                </div>
                                <div className="space-y-2">
                                  {competition.competition.maxMembers != null && (
                                    <>
                                      <div>
                                        <span className="text-sm font-medium text-gray-600">Team Name:</span>
                                        <p className="text-base md:text-lg font-bold text-blue-900">
                                          {competition.teamName}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium text-gray-600">Team Code:</span>
                                        <p className="text-base md:text-lg font-mono font-bold text-blue-900">
                                          {competition.teamCode}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">
                                      {competition.competition.maxMembers == null ? "Category:" : "Total Members:"}
                                    </span>
                                    <p className="text-base md:text-lg font-bold text-blue-900">
                                      {competition.competition.maxMembers == null
                                        ? "Individual Participant"
                                        : `${competition.members.length + 1} Players`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Team Members */}
                          <div className="mt-6 md:mt-8">
                            <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                              {competition.competition.maxMembers == null ? "Participant Details" : "Team Members"}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {/* Team Leader / Individual Participant */}
                              <TeamMemberCard
                                member={competition.teamLeader}
                                isLeader={competition.competition.maxMembers != null}
                              />

                              {/* Team Members (only for team sports) */}
                              {competition.competition.maxMembers != null &&
                                competition.members.map((member) => (
                                  <TeamMemberCard key={member.fullName} member={member} />
                                ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                            {competition.isPaid === false && (
                              <button className="bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base">
                                <QrCode className="w-4 h-4" />
                                <span>Complete Payment</span>
                              </button>
                            )}
                            <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base">
                              <Calendar className="w-4 h-4" />
                              <span>View Schedule</span>
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base">
                              <Users className="w-4 h-4" />
                              <span>Manage Team</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        user={user!}
        userEmail={session?.user?.email || ""}
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  )
}
