"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Users, Trophy, DollarSign } from "lucide-react"
import { CompetitionCarouselProps } from "@/model/competition_model"

export function CompetitionCarousel({ competitions }: CompetitionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying || competitions.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % competitions.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, competitions.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + competitions.length) % competitions.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % competitions.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (!Array.isArray(competitions)) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Teams by Competition</h2>
        <div className="text-center py-8 text-gray-500">No competitions available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Teams by Competition
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Previous competition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Next competition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {competitions.map((competition) => (
            <div key={competition.id} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Competition Info Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <Trophy className="w-8 h-8 text-blue-600" />
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        competition.competitionType === "Binusian"
                          ? "bg-blue-100 text-blue-800"
                          : competition.competitionType === "NonBinusian"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {competition.competitionType}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{competition.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{competition.category}</p>
                  <div className="text-xs text-blue-600 font-medium">{formatCurrency(competition.registrationFee)}</div>
                </div>

                {/* Total Teams Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-8 h-8 text-green-600" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-900">{competition.totalTeams}</div>
                      <div className="text-xs text-green-600">Total Teams</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Paid:</span>
                      <span className="font-medium text-green-700">{competition.paidTeams}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-medium text-yellow-700">{competition.pendingTeams}</span>
                    </div>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${competition.totalTeams > 0 ? (competition.paidTeams / competition.totalTeams) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Participants Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-8 h-8 text-purple-600" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-900">{competition.totalParticipants}</div>
                      <div className="text-xs text-purple-600">Participants</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    Avg:{" "}
                    {competition.totalTeams > 0
                      ? (competition.totalParticipants / competition.totalTeams).toFixed(1)
                      : 0}{" "}
                    per team
                  </div>
                  <div className="flex items-center text-xs text-purple-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Active Registration
                  </div>
                </div>

                {/* Revenue Card */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <DollarSign className="w-8 h-8 text-amber-600" />
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-900">
                        {formatCurrency(competition.paidTeams * competition.registrationFee)}
                      </div>
                      <div className="text-xs text-amber-600">Revenue</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    Potential: {formatCurrency(competition.totalTeams * competition.registrationFee)}
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${competition.totalTeams > 0 ? (competition.paidTeams / competition.totalTeams) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {competitions.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="flex justify-center mt-2">
        <div className="flex items-center text-xs text-gray-500">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
          ></div>
          {isAutoPlaying ? "Auto-playing" : "Paused"}
        </div>
      </div>
    </div>
  )
}
