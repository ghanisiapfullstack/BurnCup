"use client"

import type React from "react"

import { useState, useEffect, ReactNode } from "react"
import {
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
  Trash2,
  Check
} from "lucide-react"

import { User as UserModel } from "@/model/user_model"
import { Team } from "@/model/team_model"
import { fetchCurrentUser, updateCurrentUser } from "@/controller/user_controller"
import { getCurrentSession, logout } from "@/lib/actions/actions"
import { deleteTeamMember, fetchCurrentTeams, fetchTeamQrUrl } from "@/controller/team_controller"
import { pingIsPaidTeamSlot } from "@/controller/competition_controller"
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
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>        <div className="grid grid-cols-4 gap-1 md:gap-2">
        <div className="bg-[#001F54] text-white p-1.5 md:p-2 rounded-lg">
          <div className="text-sm md:text-lg font-bold">{timeLeft.days}</div>
          <div className="text-xs">Days</div>
        </div>
        <div className="bg-[#001F54] text-white p-1.5 md:p-2 rounded-lg">
          <div className="text-sm md:text-lg font-bold">{timeLeft.hours}</div>
          <div className="text-xs">Hours</div>
        </div>
        <div className="bg-[#001F54] text-white p-1.5 md:p-2 rounded-lg">
          <div className="text-sm md:text-lg font-bold">{timeLeft.minutes}</div>
          <div className="text-xs">Minutes</div>
        </div>
        <div className="bg-[#001F54] text-white p-1.5 md:p-2 rounded-lg">
          <div className="text-sm md:text-lg font-bold">{timeLeft.seconds}</div>
          <div className="text-xs">Seconds</div>
        </div>
      </div>
    </div>
  )
}

const getCountdownColor = (timeLeft: number) => {
  if (timeLeft <= 10) {
    // Last 10 seconds: warning red
    return "bg-red-100 text-red-800";
  } else if (timeLeft <= 60) {
    // Last 1 minute: warning yellow
    return "bg-yellow-100 text-yellow-800";
  } else {
    // Default: blue
    return "bg-blue-100 text-blue-800";
  }
};

const getTeamLeftColor = (slotLeft: number) => {
  if (slotLeft <= 3) {
    // Last 10 seconds: warning red
    return "bg-red-100 text-red-800";
  } else if (slotLeft <= 8) {
    // Last 1 minute: warning yellow
    return "bg-yellow-100 text-yellow-800";
  } else {
    // Default: blue
    return "bg-blue-100 text-blue-800";
  }
};

function QRCodePayment({ amount, isOpen, competition, user }: { amount: string; isOpen: boolean; competition: Team; user: UserModel | null }) {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0);
  const [qrLink, setQrLink] = useState<string | null>(null);
  const [teamSlot, setTeamSlot] = useState<number>(0);

  const isTeamLeader = competition.teamLeader.email == user?.email;
  const [isPaid, setIsPaid] = useState<boolean>(competition.isPaid);
  const teamCode = competition.teamCode;
  const isLackingTeamMembers = competition.members.length + 1 < (competition.competition.minMembers || 1);


  const {showError} = useToast();

  const copyTeamCode = () => {
    navigator.clipboard.writeText(teamCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const checkTeamStatus = async () => {
      try {
        const res = await pingIsPaidTeamSlot(competition.id)

        setIsPaid(res.isPaid)
        setTeamSlot(res.remainingSlots)
        
        if (res.isPaid || res.remainingSlots <= 0) {
          setQrLink(null)
          setTimeLeft(0)
          return
        }

        if (timeLeft <= 0) {
          //await refreshQrCode()
          setTimeLeft(900)
        }
      } catch (error: any) {
        handleError("Failed to check team slot", error)
      }
    }

    const refreshQrCode = async () => {
      setIsLoading(true)
      try {
        const token = await (await fetch("/api/token")).json()
        const qrRes = await fetchTeamQrUrl(teamCode, token.token)
        setQrLink(qrRes.qrLink)
        
        const diffInMs = new Date(qrRes.expiryTime).getTime() - new Date().getTime()
        setTimeLeft(Math.max(0, Math.floor(diffInMs / 1000)))
      } catch (error: any) {
        handleError("Failed to fetch qr link", error)
        setQrLink(null)
      }
      setIsLoading(false)
    }

    const handleError = (message: string, error: any) => {
      const errorMessage = error.response?.data?.error || error.message
      showError(message, errorMessage)
    }

  useEffect(() => {
    if (!isOpen || isPaid || !isTeamLeader || timeLeft <= 0 || isLackingTeamMembers) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1
        // Refresh every 15 seconds or when timer expires
        if (newTime % 15 === 0 || newTime <= 0) {
          checkTeamStatus()
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isOpen, isPaid, isTeamLeader])

  useEffect(() => {
    if (!isOpen || isPaid || !isTeamLeader) {
      setIsLoading(!isTeamLeader)
      setTimeLeft(0)
      setQrLink(null)
      return
    }

    checkTeamStatus()
  }, [isOpen])

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const countdownColor = getCountdownColor(timeLeft);
  const teamLeftColor = getTeamLeftColor(teamSlot);

  const qrCodeLoading: ReactNode = (
    <div>
      <QrCode className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-2" />
      <p className="text-sm text-gray-500">{isLackingTeamMembers ? 'Cannot Display QR' : isTeamLeader ? 'QR currently down' : 'Waiting...'}</p>
      <p className="text-xs text-gray-400">{isLackingTeamMembers ? `Needs ${competition.competition.minMembers || 1} members` : isTeamLeader ? 'Sorry for the inconvenience': 'Waiting for your team leader'}</p>
    </div>
  )

  const isPaidQrCode: ReactNode = (
    <div className="text-center">
      <Check className="w-12 h-12 md:w-16 md:h-16 text-green-600 mx-auto mb-2" />
      <p className="text-sm text-green-600 mb-2">Payment Completed</p>
      <p className="text-xs text-gray-500">{competition.competition.paidMessage}</p>
    </div>
  )

  const teamSlotFullQrCode: ReactNode = (
    <div className="text-center">
      <X className="w-12 h-12 md:w-16 md:h-16 text-red-600 mx-auto mb-2" />
      <p className="text-sm text-red-600 mb-2">Team Slot Full</p>
      <p className="text-xs text-gray-500">No more slots available for this competition.</p>
    </div>
  )

  const qrCodeObject: ReactNode = (
    isLoading || qrLink == null ? qrCodeLoading : 
    <Image
      src={qrLink}
      alt="QR Code"
      width={300}
      height={300}
      className='object-contain'
    />
  )

  if (!isOpen) {
    return null;
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
            {isPaid ? isPaidQrCode : teamSlot <= 0 ? teamSlotFullQrCode : qrCodeObject}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 mb-3">
        <span className={`${teamLeftColor} px-2 md:px-3 py-1 rounded-lg font-mono font-semibold text-sm md:text-base`}>
          {teamSlot} slot{teamSlot > 1 ? 's' : ''} left
        </span>
      </div>

      <div className="flex items-center justify-center space-x-2 mb-3">
        <span className={`${countdownColor} px-2 md:px-3 py-1 rounded-lg font-mono font-semibold text-sm md:text-base`}>
          {formattedMinutes}:{formattedSeconds}
        </span>
      </div>

      {!isLackingTeamMembers && isTeamLeader ? <div>
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className={`bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-lg font-mono font-semibold text-sm md:text-base`}>
            Transfer BLU BY BCA DIGITAL
          </span>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className={`bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-lg font-mono font-semibold text-sm md:text-base`}>
            090181802992 A/N NADILA AZAHRA
          </span>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className={`bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-lg font-mono font-semibold text-sm md:text-base`}>
            Contact whatsapp 087851327818 with your proof of payment and team name
          </span>
        </div>
      </div> : <div></div>}


      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Team Code for Reference:</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-2 md:px-3 py-1 rounded-lg font-mono font-semibold text-sm md:text-base">
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

function TeamMemberCard({ 
  member, 
  isLeader = false, 
  canDelete = false, 
  onDelete 
}: { 
  member: UserModel; 
  isLeader?: boolean; 
  canDelete?: boolean; 
  onDelete?: () => void; 
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
      {canDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-10"
          title="Remove member"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-[#001F54] to-[#003875] rounded-full flex items-center justify-center">
          {isLeader ? <Crown className="w-6 h-6 text-yellow-400" /> : <User className="w-6 h-6 text-white" />}
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

          {member.userType == "Binusian" ? (
            <div className="space-y-1">
              <p className="text-xs text-gray-600">
                <span className="font-medium">NIM:</span> {member.nim}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Major:</span> {member.major}
              </p>
            </div>
          ) : member.userType == "SMA/SMK" ? (
            <p className="text-xs text-gray-600">
              <span className="font-medium">School:</span> {member.school}
            </p>
          ) : (
            <div></div>
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
    <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-white/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
              value={formData.userType}
              onChange={(e) => handleInputChange("userType", e.target.value)}
              disabled = {user != emptyUser}
              className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border-2 border-[#003875] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F54] focus:border-transparent bg-gradient-to-r from-[#001F54]/10 to-[#003875]/10 text-sm md:text-base"
            >
              <option value="Binusian">Binusian</option>
              <option value="SMA/SMK">SMA/SMK</option>
              <option value="Others">Others</option>
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
                className="w-full px-3 py-2 border-2 border-[#003875] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F54] focus:border-transparent text-sm md:text-base"
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
                className="w-full px-3 py-2 border-2 border-[#003875] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F54] focus:border-transparent text-sm md:text-base"
              />
            </div>

            {/* Conditional Fields */}
            {formData.userType == "Binusian" ? (
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
                    className="w-full px-3 py-2 border-2 border-[#003875] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F54] focus:border-transparent text-sm md:text-base"
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
                    className="w-full px-3 py-2 border-2 border-[#003875] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F54] focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </>
            ) : formData.userType == "SMA/SMK" ? (
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
                  className="w-full px-3 py-2 border-2 border-[#003875] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F54] focus:border-transparent text-sm md:text-base"
                />
              </div>
            ) : (
              <div></div>
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
              className="w-full sm:w-auto px-4 md:px-6 py-2 bg-gradient-to-r from-[#001F54] to-[#003875] text-white rounded-lg hover:from-[#003875] hover:to-[#001F54] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm md:text-base"
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

function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  memberName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/30 w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Remove Team Member
          </h3>
          <p className="text-sm text-gray-600 text-center mb-6">
            Are you sure you want to remove <span className="font-semibold">{memberName}</span> from the team? This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const emptyUser: UserModel = {
  fullName: "-",
  email: "-",
  phoneNumber: "-",
  userType: "Binusian",
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
  const [isManagingTeam, setIsManagingTeam] = useState<Set<string>>(new Set())
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    memberName: string;
    memberId: string;
    teamId: string;
  }>({
    isOpen: false,
    memberName: '',
    memberId: '',
    teamId: '',
  })

  const router = useRouter()
  const {showError, showSuccess} = useToast();

  

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

  const toggleManageTeam = (teamId: string) => {
    const newManaging = new Set(isManagingTeam)
    if (newManaging.has(teamId)) {
      newManaging.delete(teamId)
    } else {
      newManaging.add(teamId)
    }
    setIsManagingTeam(newManaging)
  }

  const handleDeleteMember = (teamId: string, memberId: string, memberName: string) => {
    setDeleteModal({
      isOpen: true,
      memberName,
      memberId,
      teamId,
    })
  }

  const confirmDeleteMember = async () => {
    try {
        const token = await (await fetch("/api/token")).json();
        (await deleteTeamMember(token.token, deleteModal.teamId, deleteModal.memberId));
        console.log(`Deleting member ${deleteModal.memberId} from team ${deleteModal.teamId}`)

        setDeleteModal({
          isOpen: false,
          memberName: '',
          memberId: '',
          teamId: '',
        })
    
        // You can add toast notification here
        showSuccess("Member removed", `${deleteModal.memberName} has been removed from the team`)
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

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      memberName: '',
      memberId: '',
      teamId: '',
    })
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Sports Dashboard</h1>
                <p className="text-sm md:text-base text-gray-700">
                  Welcome back, <span className="font-semibold text-blue-600">{session?.user?.name}</span>!
                </p>
                <p className="text-sm md:text-base text-gray-600 hidden md:block">
                  Here are your registered competitions across different sports.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="text-left sm:text-right">
                  <div className="inline-block bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold">
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
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-4 md:py-8 px-4">
        {/* Mobile Profile Card - Only visible on mobile */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#001F54] to-[#003875] rounded-full flex items-center justify-center flex-shrink-0">
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
                      "bg-gradient-to-r from-[#001F54] to-[#003875] text-white"
                    }`}
                  >
                    {user?.userType}
                  </span>
                  <span className="text-xs text-gray-500">{competitions?.length} Competitions</span>
                </div>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white p-2 rounded-lg hover:from-[#003875] hover:to-[#001F54] transition-all flex-shrink-0"
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
                <div className="w-20 h-20 bg-gradient-to-r from-[#001F54] to-[#003875] rounded-full flex items-center justify-center mx-auto mb-4">
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
                    "bg-gradient-to-r from-[#001F54] to-[#003875] text-white"
                  }`}
                >
                  {user?.userType}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{user?.phoneNumber}</span>
                </div>

                {user?.userType == "Binusian" ? (
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
                ) : user?.userType == "SMA/SMK" ? (
                  <div className="flex items-center space-x-3">
                    <School className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{user?.school}</span>
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="flex items-center space-x-3">
                  <Trophy className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{competitions?.length} Competitions</span>
                </div>
              </div>

              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="w-full bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-4 py-2 rounded-lg font-medium hover:from-[#003875] hover:to-[#001F54] transition-all flex items-center justify-center space-x-2"
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
                className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:from-[#003875] hover:to-[#001F54] transition-all text-sm md:text-base">
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
                      className={`text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-lg transition-all ${
                        expandedCompetitions.size === competitions?.length
                          ? "bg-gradient-to-r from-[#001F54] to-[#003875] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-[#001F54] hover:to-[#003875] hover:text-white"
                      }`}
                    >
                      Expand All
                    </button>
                    <button
                      onClick={collapseAll}
                      className={`text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-lg transition-all ${
                        expandedCompetitions.size === 0
                          ? "bg-gradient-to-r from-[#001F54] to-[#003875] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-[#001F54] hover:to-[#003875] hover:text-white"
                      }`}
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
                        className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white p-3 md:p-4 cursor-pointer hover:from-[#003875] hover:to-[#001F54] transition-all"
                        onClick={() => toggleCompetition(competition.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                              <h3 className="text-lg md:text-xl font-bold truncate">{competition.competition.name}</h3>
                              <div className="flex flex-wrap gap-1">
                                <span className="bg-[#003875] text-white px-2 py-0.5 rounded-full text-xs font-medium">
                                  {competition.competition.competitionType}
                                </span>
                                <span className="bg-[#001F54] text-white px-2 py-0.5 rounded-full text-xs font-medium">
                                  {competition.competition.category}
                                </span>
                              </div>
                            </div>

                            {/* Mobile-specific info */}
                            <div className="mt-2 sm:hidden">
                              <div className="flex items-center space-x-2 text-xs text-white">
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
                                <span className="text-white">{competition.competition.venue}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Trophy className="w-3 h-3" />
                                <span className="text-white">{competition.competition.registrationfee}</span>
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
                                  <ChevronUp className="w-5 h-5 text-white" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-white" />
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
                              <QRCodePayment amount={competition.competition.registrationfee.toString()} isOpen={expandedCompetitions.has(competition.id)} competition={competition} user={user} />
                            </div>

                            {/* Team Information */}
                            <div className="space-y-4">
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-base md:text-lg font-semibold text-gray-900">
                                    {competition.competition.maxMembers == null
                                      ? "Participant Info"
                                      : "Team Information"}
                                  </h4>
                                  <Users className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                                </div>
                                <div className="space-y-2">
                                  {competition.competition.maxMembers != null && (
                                    <>
                                      <div>
                                        <span className="text-sm font-medium text-gray-600">Team Name:</span>
                                        <p className="text-base md:text-lg font-bold text-gray-900">
                                          {competition.teamName}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium text-gray-600">Team Code:</span>
                                        <p className="text-base md:text-lg font-mono font-bold text-gray-900">
                                          {competition.teamCode}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">
                                      {competition.competition.maxMembers == null ? "Category:" : "Total Members:"}
                                    </span>
                                    <p className="text-base md:text-lg font-bold text-gray-900">
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
                                canDelete={false} // Leaders cannot be deleted
                              />

                              {/* Team Members (only for team sports) */}
                              {competition.competition.maxMembers != null &&
                                competition.members.map((member, index) => (
                                  <TeamMemberCard 
                                    key={`${member.email}-${index}`} 
                                    member={member} 
                                    canDelete={
                                      isManagingTeam.has(competition.id) && 
                                      competition.teamLeader.email === user?.email
                                    }
                                    onDelete={() => handleDeleteMember(
                                      competition.id, 
                                      member.email, 
                                      member.fullName
                                    )}
                                  />
                                ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                            {competition.competition.maxMembers != null && 
                             competition.teamLeader.email === user?.email && (
                              <button 
                                onClick={() => toggleManageTeam(competition.id)}
                                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm md:text-base ${
                                  isManagingTeam.has(competition.id)
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <Users className="w-4 h-4" />
                                <span>
                                  {isManagingTeam.has(competition.id) ? "Stop Managing" : "Manage Team"}
                                </span>
                              </button>
                            )}
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

      {/* Delete Member Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteMember}
        memberName={deleteModal.memberName}
      />
    </div>
  )
}
