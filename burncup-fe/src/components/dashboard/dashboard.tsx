"use client"

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
} from "lucide-react"

// Mock data - replace with real API calls
const mockCompetitions = [
  {
    id: 1,
    name: "BURNCUP 2025 Basketball Tournament",
    sport: "Basketball",
    category: "Team Sport",
    status: "registered",
    registrationEndDate: "2025-02-15T23:59:59",
    competitionStartDate: "2025-03-01T09:00:00",
    venue: "Binus Bekasi Sports Hall",
    registrationFee: "Rp 250.000",
    paymentStatus: "pending",
    maxTeamSize: 8,
    team: {
      id: 1,
      name: "Thunder Bolts",
      code: "TB2025",
      leader: {
        id: 1,
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        phone: "+62 812-3456-7890",
        nim: "2501234567",
        major: "Computer Science",
        userType: "binusian",
      },
      members: [
        {
          id: 2,
          name: "Alex Chen",
          email: "alex.chen@email.com",
          phone: "+62 813-4567-8901",
          nim: "2501234568",
          major: "Information Systems",
          userType: "binusian",
        },
        {
          id: 3,
          name: "Sarah Davis",
          email: "sarah.davis@email.com",
          phone: "+62 814-5678-9012",
          school: "Jakarta International School",
          userType: "non-binusian",
        },
      ],
    },
  },
  {
    id: 2,
    name: "Futsal Championship 2025",
    sport: "Futsal",
    category: "Team Sport",
    status: "registered",
    registrationEndDate: "2025-02-20T23:59:59",
    competitionStartDate: "2025-03-10T08:00:00",
    venue: "Binus Alam Sutera Futsal Court",
    registrationFee: "Rp 300.000",
    paymentStatus: "paid",
    maxTeamSize: 7,
    team: {
      id: 2,
      name: "Goal Crushers",
      code: "GC2025",
      leader: {
        id: 5,
        name: "Roberto Silva",
        email: "roberto.silva@email.com",
        phone: "+62 816-7890-1234",
        nim: "2501234570",
        major: "International Business",
        userType: "binusian",
      },
      members: [
        {
          id: 6,
          name: "Ahmad Rizki",
          email: "ahmad.rizki@email.com",
          phone: "+62 817-8901-2345",
          nim: "2501234571",
          major: "Computer Engineering",
          userType: "binusian",
        },
        {
          id: 7,
          name: "Kevin Tan",
          email: "kevin.tan@email.com",
          phone: "+62 818-9012-3456",
          school: "Binus International School",
          userType: "non-binusian",
        },
        {
          id: 8,
          name: "Dimas Pratama",
          email: "dimas.pratama@email.com",
          phone: "+62 819-0123-4567",
          nim: "2501234572",
          major: "Marketing",
          userType: "binusian",
        },
      ],
    },
  },
  {
    id: 3,
    name: "Badminton Singles Open 2025",
    sport: "Badminton",
    category: "Individual Sport",
    status: "registered",
    registrationEndDate: "2025-02-10T23:59:59",
    competitionStartDate: "2025-02-25T07:00:00",
    venue: "Binus Kemanggisan Sports Center",
    registrationFee: "Rp 150.000",
    paymentStatus: "paid",
    maxTeamSize: 1,
    team: {
      id: 3,
      name: "Individual Entry",
      code: "BD2025",
      leader: {
        id: 9,
        name: "Lisa Wong",
        email: "lisa.wong@email.com",
        phone: "+62 820-1234-5678",
        nim: "2501234573",
        major: "Psychology",
        userType: "binusian",
      },
      members: [],
    },
  },
  {
    id: 4,
    name: "E-Sports Mobile Legends Tournament",
    sport: "Mobile Legends",
    category: "E-Sports",
    status: "registered",
    registrationEndDate: "2025-02-28T23:59:59",
    competitionStartDate: "2025-03-15T13:00:00",
    venue: "Binus E-Sports Arena (Online)",
    registrationFee: "Rp 200.000",
    paymentStatus: "pending",
    maxTeamSize: 5,
    team: {
      id: 4,
      name: "Digital Warriors",
      code: "DW2025",
      leader: {
        id: 10,
        name: "Ryan Adiputra",
        email: "ryan.adiputra@email.com",
        phone: "+62 821-2345-6789",
        nim: "2501234574",
        major: "Game Application Technology",
        userType: "binusian",
      },
      members: [
        {
          id: 11,
          name: "Farel Gunawan",
          email: "farel.gunawan@email.com",
          phone: "+62 822-3456-7890",
          nim: "2501234575",
          major: "Computer Science",
          userType: "binusian",
        },
        {
          id: 12,
          name: "Jessica Lim",
          email: "jessica.lim@email.com",
          phone: "+62 823-4567-8901",
          school: "Pelita Harapan University",
          userType: "non-binusian",
        },
        {
          id: 13,
          name: "Budi Santoso",
          email: "budi.santoso@email.com",
          phone: "+62 824-5678-9012",
          nim: "2501234576",
          major: "Information Systems",
          userType: "binusian",
        },
      ],
    },
  },
]

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
      <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-semibold">{label} has ended</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <div className="text-lg font-bold">{timeLeft.days}</div>
          <div className="text-xs">Days</div>
        </div>
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <div className="text-lg font-bold">{timeLeft.hours}</div>
          <div className="text-xs">Hours</div>
        </div>
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <div className="text-lg font-bold">{timeLeft.minutes}</div>
          <div className="text-xs">Minutes</div>
        </div>
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <div className="text-lg font-bold">{timeLeft.seconds}</div>
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
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Payment QR Code</h4>
        <p className="text-sm text-gray-600">Scan to pay registration fee: {amount}</p>
      </div>

      {/* QR Code Placeholder */}
      <div className="flex justify-center mb-4">
        <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">QR Code</p>
            <p className="text-xs text-gray-400">Payment Gateway</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Team Code for Reference:</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-mono font-semibold">{teamCode}</span>
          <button onClick={copyTeamCode} className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
            {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
      </div>
    </div>
  )
}

function TeamMemberCard({ member, isLeader = false }: { member: any; isLeader?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          {isLeader ? <Crown className="w-6 h-6 text-yellow-600" /> : <User className="w-6 h-6 text-blue-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-900 truncate">{member.name}</h4>
            {isLeader && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                Leader
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-1">{member.email}</p>
          <p className="text-xs text-gray-600 mb-2">{member.phone}</p>

          {member.userType === "binusian" ? (
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

export function Dashboard() {
  const [competitions] = useState(mockCompetitions)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedCompetitions, setExpandedCompetitions] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboard = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }

    loadDashboard()
  }, [])

  const toggleCompetition = (competitionId: number) => {
    const newExpanded = new Set(expandedCompetitions)
    if (newExpanded.has(competitionId)) {
      newExpanded.delete(competitionId)
    } else {
      newExpanded.add(competitionId)
    }
    setExpandedCompetitions(newExpanded)
  }

  const expandAll = () => {
    setExpandedCompetitions(new Set(competitions.map((c) => c.id)))
  }

  const collapseAll = () => {
    setExpandedCompetitions(new Set())
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Dashboard...</h3>
          <p className="text-gray-500">Fetching your competition data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">Sports Dashboard</h1>
              <p className="text-blue-800">
                Welcome back! Here are your registered competitions across different sports.
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Multi-Sport Athlete
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        {competitions.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Competitions Yet</h3>
            <p className="text-gray-500 mb-6">You haven't registered for any competitions yet.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Browse Competitions
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Accordion Controls */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Competitions ({competitions.length})</h2>
              <div className="flex space-x-2">
                <button
                  onClick={expandAll}
                  className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Accordion Items */}
            {competitions.map((competition) => {
              const isExpanded = expandedCompetitions.has(competition.id)

              return (
                <div
                  key={competition.id}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200"
                >
                  {/* Accordion Header - Always Visible */}
                  <div
                    className="bg-blue-600 text-white p-4 cursor-pointer hover:bg-blue-700 transition-colors"
                    onClick={() => toggleCompetition(competition.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold">{competition.name}</h3>
                          <span className="bg-blue-500 text-blue-100 px-2 py-1 rounded-full text-xs font-medium">
                            {competition.sport}
                          </span>
                          <span className="bg-blue-800 text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                            {competition.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm">
                          <div className="flex items-center space-x-2 mb-1">
                            <MapPin className="w-3 h-3" />
                            <span className="text-blue-100">{competition.venue}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-3 h-3" />
                            <span className="text-blue-100">{competition.registrationFee}</span>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            competition.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {competition.paymentStatus === "pending" ? "Payment Pending" : "Paid"}
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

                  {/* Accordion Content - Expandable */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-none opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="p-6">
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Countdown Timers */}
                        <div className="space-y-6">
                          <CountdownTimer targetDate={competition.registrationEndDate} label="Registration Ends In" />
                          <CountdownTimer targetDate={competition.competitionStartDate} label="Competition Starts In" />
                        </div>

                        {/* Payment QR Code */}
                        <div>
                          <QRCodePayment amount={competition.registrationFee} teamCode={competition.team.code} />
                        </div>

                        {/* Team Information */}
                        <div className="space-y-4">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-semibold text-blue-900">
                                {competition.category === "Individual Sport" ? "Participant Info" : "Team Information"}
                              </h4>
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="space-y-2">
                              {competition.category !== "Individual Sport" && (
                                <>
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">Team Name:</span>
                                    <p className="text-lg font-bold text-blue-900">{competition.team.name}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-600">Team Code:</span>
                                    <p className="text-lg font-mono font-bold text-blue-900">{competition.team.code}</p>
                                  </div>
                                </>
                              )}
                              <div>
                                <span className="text-sm font-medium text-gray-600">
                                  {competition.category === "Individual Sport" ? "Category:" : "Total Members:"}
                                </span>
                                <p className="text-lg font-bold text-blue-900">
                                  {competition.category === "Individual Sport"
                                    ? "Individual Participant"
                                    : `${competition.team.members.length + 1} Players`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="mt-8">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          {competition.category === "Individual Sport" ? "Participant Details" : "Team Members"}
                        </h4>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Team Leader / Individual Participant */}
                          <TeamMemberCard
                            member={competition.team.leader}
                            isLeader={competition.category !== "Individual Sport"}
                          />

                          {/* Team Members (only for team sports) */}
                          {competition.category !== "Individual Sport" &&
                            competition.team.members.map((member) => (
                              <TeamMemberCard key={member.id} member={member} />
                            ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-8 flex flex-wrap gap-4">
                        {competition.paymentStatus === "pending" && (
                          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                            <QrCode className="w-4 h-4" />
                            <span>Complete Payment</span>
                          </button>
                        )}
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>View Schedule</span>
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2">
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
  )
}
