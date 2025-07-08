"use client"

import type React from "react"

import { Plus, Search, Trophy } from "lucide-react"
import { useState, useEffect } from "react"
import { Competition } from "@/model/competition_model"
import { CreateTeam, JoinTeamByCode } from "@/controller/team_controller"
import { useToast } from "@/components/common/toast/toast-context"

interface TeamStepProps {
  onComplete: () => void
  isCompleted: boolean
  competition: Competition
}

export function TeamStep({ onComplete, isCompleted, competition }: TeamStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isSingleTeam, setIsSingleTeam] = useState(false)
  const [activeTab, setActiveTab] = useState("join")
  const [teamName, setTeamName] = useState("")
  const [teamCode, setTeamCode] = useState("")

  const {showError} = useToast();

  // Simulate loading teams data
  useEffect(() => {
    const loadTeamsData = async () => {
      setIsSingleTeam(competition.maxMembers == null)
      if (competition.maxMembers == null) {
        setActiveTab("create")
      }

      setIsInitializing(false)
    }

    loadTeamsData()
  }, [])

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = await (await fetch("/api/token")).json();
      await CreateTeam(token.token, teamName, competition.id.toString())
      setIsLoading(false)
      onComplete()
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        showError("Failed to create team", errorMessage);
      } else if (error.request) {
        console.error("Failed to create team: No response received", error.request);
      } else {
        console.error("Failed to create team:", error.message);
      }
    }
    setIsLoading(false)
  }

  const handleJoinWithCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamCode.trim()) return

    setIsLoading(true)

    try {
      const token = await (await fetch("/api/token")).json();
      await JoinTeamByCode(token.token, teamCode, competition.id.toString())
      setIsLoading(false)
      onComplete()
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        showError("Failed to join team", errorMessage);
      } else if (error.request) {
        console.error("Failed to join team: No response received", error.request);
      } else {
        console.error("Failed to join team:", error.message);
      }
    }
    setIsLoading(false)
  }

  if (isCompleted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-600 mb-2">Team Setup Complete!</h3>
        <p className="text-gray-600">You're all set and ready for the tournament!</p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
          Go to Dashboard
        </button>
      </div>
    )
  }

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading available teams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="w-full">
        <div className="flex w-full border-b border-gray-200">
          {!isSingleTeam ? <button
            onClick={() => setActiveTab("join")}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors font-medium ${
              activeTab === "join"
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Join a Team</span>
            </div>
          </button> : null}
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors font-medium ${
              activeTab === "create"
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Team</span>
            </div>
          </button>
        </div>

        {activeTab === "join" && (
          <div className="space-y-6 mt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Join an Existing Team</h3>
              <p className="text-gray-600">
                Browse available teams and request to join one that matches your skill level
              </p>
            </div>

            {/* Join with Team Code Section */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Join with Team Code
              </h4>
              <p className="text-gray-600 mb-4">Have a team code? Enter it below to join directly.</p>
              <form onSubmit={handleJoinWithCode} className="flex gap-3 flex-wrap">
                <input
                  type="text"
                  value={teamCode}
                  onChange={(e) => setTeamCode(e.target.value)}
                  placeholder="Enter team code (e.g., TB2025, CK2025)"
                  className="flex-1 px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading || !teamCode.trim()}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Joining..." : "Join Team"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="space-y-6 mt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Create Your Own Team</h3>
              <p className="text-gray-600">Start your own team and invite other players to join</p>
            </div>

            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <h4 className="text-lg font-semibold">Team Details</h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">Provide information about your new team</p>
              </div>
              <div className="p-4">
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
                      Team Name *
                    </label>
                    <input
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Enter your team name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="compName" className="block text-sm font-medium text-gray-700">
                      Competition Name
                    </label>
                    <input
                      id="compName"
                      value={competition.name}
                      onChange={() => {}}
                      disabled
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700">
                      Maximum Team Size
                    </label>
                    <input
                      id="maxMembers"
                      type="number"
                      value={competition.maxMembers ? competition.maxMembers : 1}
                      disabled={true}
                      onChange={() => {}}
                      className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500">
                      {isSingleTeam ? 'This is a solo competition (max 1 member)' : `Competition rules require ${competition.minMembers}-${competition.maxMembers} players per team`}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !teamName}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating Team..." : "Create Team"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
