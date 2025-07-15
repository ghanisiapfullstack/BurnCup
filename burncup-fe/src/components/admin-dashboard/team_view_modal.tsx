"use client"

import { X, Crown, Users, Calendar, Mail, Phone, GraduationCap, School } from "lucide-react"
import type { Team } from "@/model/team_model"

interface TeamViewModalProps {
  isOpen: boolean
  onClose: () => void
  team: Team | null
}

export function TeamViewModal({ isOpen, onClose, team }: TeamViewModalProps) {
  if (!isOpen || !team) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Team Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Team Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{team.teamName}</h1>
                <p className="text-gray-600 mb-4">Team Code: {team.teamCode}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {team.competition.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      team.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {team.isPaid ? "Payment Complete" : "Payment Pending"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Registration Fee</div>
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(team.competition.registrationfee)}
                </div>
              </div>
            </div>
          </div>

          {/* Competition Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Competition Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{team.competition.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{team.competition.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Registration: {formatDate(team.competition.registrationStartDate)} -{" "}
                    {formatDate(team.competition.registrationEndDate)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Competition: {formatDate(team.competition.competitionStartDate)} -{" "}
                    {formatDate(team.competition.competitionEndDate)}
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-sm text-gray-600">Team Size</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {team.members.length} / {team.competition.maxMembers} members
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min((team.members.length / (team.competition.maxMembers || 8)) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-sm text-gray-600">Competition Type</div>
                    <div className="text-lg font-semibold text-gray-900">{team.competition.competitionType}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Leader */}
          <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-amber-600" />
              Team Leader
            </h3>
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{team.teamLeader.fullName}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {team.teamLeader.email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {team.teamLeader.phoneNumber}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {team.teamLeader.binusian ? (
                        <>
                          <div className="flex items-center text-gray-600">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            NIM: {team.teamLeader.nim}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            {team.teamLeader.major}
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center text-gray-600">
                          <School className="w-4 h-4 mr-2" />
                          {team.teamLeader.school}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Team Members ({team.members.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.members.map((member, index) => (
                <div key={member.email} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{member.fullName}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-2" />
                          {member.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-2" />
                          {member.phoneNumber}
                        </div>
                        {member.binusian ? (
                          <>
                            <div className="flex items-center">
                              <GraduationCap className="w-3 h-3 mr-2" />
                              NIM: {member.nim}
                            </div>
                            <div className="flex items-center">
                              <GraduationCap className="w-3 h-3 mr-2" />
                              {member.major}
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center">
                            <School className="w-3 h-3 mr-2" />
                            {member.school}
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            member.binusian ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {member.binusian ? "Binusian" : "Non-Binusian"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-sm text-gray-600 mb-1">Registered On</div>
                <div className="font-semibold text-gray-900">{formatDate(team.createdAt)}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-sm text-gray-600 mb-1">Last Updated</div>
                <div className="font-semibold text-gray-900">{formatDate(team.updatedAt)}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-sm text-gray-600 mb-1">Payment Status</div>
                <div className={`font-semibold ${team.isPaid ? "text-green-600" : "text-yellow-600"}`}>
                  {team.isPaid ? "Completed" : "Pending"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
