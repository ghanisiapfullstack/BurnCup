"use client"

import { X, Trophy, FileText, CheckCircle, MapPin, Calendar, Users, DollarSign, ImageIcon } from "lucide-react"
import type { Competition } from "@/model/competition_model"

interface CompetitionViewModalProps {
  isOpen: boolean
  onClose: () => void
  competition: Competition | null
}

export function CompetitionViewModal({ isOpen, onClose, competition }: CompetitionViewModalProps) {
  if (!isOpen || !competition) return null

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
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{competition.name}</h2>
            <p className="text-blue-100">
              {competition.category} • {competition.competitionType}
            </p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Competition Image */}
          {competition.imageUrl && (
            <div className="mb-6">
              {/* <ImageIcon
                src={competition.imageUrl || "/placeholder.svg"}
                alt={competition.name}
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              /> */}
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{competition.description}</p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Venue</span>
              </div>
              <p className="text-gray-700">{competition.venue}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Registration Period</span>
              </div>
              <p className="text-gray-700 text-sm">
                {formatDate(competition.registrationStartDate)} - {formatDate(competition.registrationEndDate)}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">Competition Period</span>
              </div>
              <p className="text-gray-700 text-sm">
                {formatDate(competition.competitionStartDate)} - {formatDate(competition.competitionEndDate)}
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-900">Team Size</span>
              </div>
              <p className="text-gray-700">
                {competition.minMembers && competition.maxMembers
                  ? `${competition.minMembers} - ${competition.maxMembers} members`
                  : competition.maxMembers
                    ? `Max ${competition.maxMembers} members`
                    : "Individual"}
              </p>
            </div>
          </div>

          {/* Registration Fee */}
          <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Registration Fee</h3>
            </div>
            <p className="text-3xl font-bold text-green-700">{formatCurrency(competition.registrationfee)}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Prizes Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-900">Prizes</h3>
              </div>
              {competition.prizes && competition.prizes.length > 0 ? (
                <div className="space-y-3">
                  {competition.prizes.map((prize, index) => (
                    <div key={prize.id} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-yellow-700">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{prize.name}</h4>
                        <p className="text-gray-700 text-sm">{prize.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No prizes specified</p>
              )}
            </div>

            {/* Rules Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Rules</h3>
              </div>
              {competition.rules && competition.rules.length > 0 ? (
                <div className="space-y-3">
                  {competition.rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-700">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{rule}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No rules specified</p>
              )}
            </div>

            {/* Requirements Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Requirements</h3>
              </div>
              {competition.requirements && competition.requirements.length > 0 ? (
                <div className="space-y-3">
                  {competition.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm">{requirement}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No requirements specified</p>
              )}
            </div>
          </div>

          {/* Competition Type and Category */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Category:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {competition.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Type:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {competition.competitionType}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
