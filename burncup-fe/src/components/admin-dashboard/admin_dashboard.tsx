"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Users,
  Trophy,
  Plus,
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Crown,
  GraduationCap,
  School,
  Eye,
  Edit,
  Trash2,
  X,
  Save,
  MapPin,
  DollarSign,
} from "lucide-react"
import { useToast } from "@/components/common/toast/toast-context"
import { CompetitionViewModal } from "./competition_view_modal"
import { TeamViewModal } from "./team_view_modal"
import { Pagination } from "./pagination"
import { CompetitionStats, type Competition } from "@/model/competition_model"
import type { Team } from "@/model/team_model"
import { CompetitionCarousel } from "./competition_carousel"
import { AdminBasicInfoResponse } from "@/model/admin_model"
import { addCompetition, fetchAdminBasicInfo, fetchAdminCompetitionStats, fetchAllTeams } from "@/controller/admin_controller"
import { fetchCompetitions } from "@/controller/competition_controller"

interface AddCompetitionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (competition: Competition) => void
  editingCompetition?: Competition | null
}

function AddCompetitionModal({ isOpen, onClose, onSave, editingCompetition }: AddCompetitionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    registrationStartDate: "",
    registrationEndDate: "",
    competitionStartDate: "",
    competitionEndDate: "",
    competitionType: "Mixed",
    venue: "",
    registrationfee: 0,
    prizes: [{ name: "", description: "" }],
    rules: [""],
    requirements: [""],
    maxMembers: 8,
    minMembers: 5,
    teamSlot: 1,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (editingCompetition) {
      setFormData({
        name: editingCompetition.name,
        description: editingCompetition.description,
        category: editingCompetition.category,
        imageUrl: editingCompetition.imageUrl,
        registrationStartDate: editingCompetition.registrationStartDate.split("T")[0],
        registrationEndDate: editingCompetition.registrationEndDate.split("T")[0],
        competitionStartDate: editingCompetition.competitionStartDate.split("T")[0],
        competitionEndDate: editingCompetition.competitionEndDate.split("T")[0],
        competitionType: editingCompetition.competitionType,
        venue: editingCompetition.venue,
        registrationfee: editingCompetition.registrationfee,
        prizes:
          editingCompetition.prizes.length > 0
            ? editingCompetition.prizes.map((p) => ({ name: p.name, description: p.description }))
            : [{ name: "", description: "" }],
        rules: editingCompetition.rules.length > 0 ? editingCompetition.rules : [""],
        requirements: editingCompetition.requirements.length > 0 ? editingCompetition.requirements : [""],
        maxMembers: editingCompetition.maxMembers || 8,
        minMembers: editingCompetition.minMembers || 5,
        teamSlot: editingCompetition.teamSlot || 1,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        imageUrl: "",
        registrationStartDate: "",
        registrationEndDate: "",
        competitionStartDate: "",
        competitionEndDate: "",
        competitionType: "Mixed",
        venue: "",
        registrationfee: 0,
        prizes: [{ name: "", description: "" }],
        rules: [""],
        requirements: [""],
        maxMembers: 8,
        minMembers: 5,
        teamSlot: 1,
      })
    }
  }, [editingCompetition, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const competitionData: Competition = {
      id: editingCompetition?.id || `comp-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      imageUrl: formData.imageUrl,
      registrationStartDate: `${formData.registrationStartDate}T00:00:00Z`,
      registrationEndDate: `${formData.registrationEndDate}T23:59:59Z`,
      competitionStartDate: `${formData.competitionStartDate}T09:00:00Z`,
      competitionEndDate: `${formData.competitionEndDate}T18:00:00Z`,
      competitionType: formData.competitionType,
      venue: formData.venue,
      registrationfee: formData.registrationfee,
      prizes: formData.prizes
        .filter((prize) => prize.name.trim() !== "" && prize.description.trim() !== "")
        .map((prize, index) => ({
          id: `prize-${Date.now()}-${index}`,
          name: prize.name,
          description: prize.description,
        })),
      rules: formData.rules.filter((rule) => rule.trim() !== ""),
      requirements: formData.requirements.filter((req) => req.trim() !== ""),
      maxMembers: formData.maxMembers,
      minMembers: formData.minMembers,
      teamSlot: formData.teamSlot
    }

    onSave(competitionData)
    setIsLoading(false)
    onClose()
  }

  const addPrize = () => {
    setFormData((prev) => ({
      ...prev,
      prizes: [...prev.prizes, { name: "", description: "" }],
    }))
  }

  const removePrize = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index),
    }))
  }

  const updatePrize = (index: number, field: "name" | "description", value: string) => {
    setFormData((prev) => ({
      ...prev,
      prizes: prev.prizes.map((prize, i) => (i === index ? { ...prize, [field]: value } : prize)),
    }))
  }

  const addArrayField = (field: "rules" | "requirements") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayField = (field: "rules" | "requirements", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const updateArrayField = (field: "rules" | "requirements", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {editingCompetition ? "Edit Competition" : "Add New Competition"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Competition Name</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter competition name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter competition description"
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Sports">Sports</option>
                  <option value="E-Sports">E-Sports</option>
                  <option value="Creative">Creative</option>
                  <option value="Automotive">Automotive</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Competition Type</label>
                <select
                  value={formData.competitionType}
                  onChange={(e) => setFormData((prev) => ({ ...prev, competitionType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Binusian">Binusian</option>
                  <option value="NonBinusian">Non-Binusian</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Registration Fee (IDR)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.registrationfee}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, registrationfee: Number.parseInt(e.target.value) || 0 }))
                  }
                  placeholder="250000"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Venue</label>
                <input
                  value={formData.venue}
                  onChange={(e) => setFormData((prev) => ({ ...prev, venue: e.target.value }))}
                  placeholder="Enter competition venue"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Min Team Size</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={formData.minMembers}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, minMembers: Number.parseInt(e.target.value) || 1 }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Max Team Size</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={formData.maxMembers}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, maxMembers: Number.parseInt(e.target.value) || 8 }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Team Slot</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={formData.teamSlot}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, teamSlot: Number.parseInt(e.target.value) || 8 }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Registration Start Date</label>
                <input
                  type="date"
                  value={formData.registrationStartDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, registrationStartDate: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Registration End Date</label>
                <input
                  type="date"
                  value={formData.registrationEndDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, registrationEndDate: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Competition Start Date</label>
                <input
                  type="date"
                  value={formData.competitionStartDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, competitionStartDate: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Competition End Date</label>
                <input
                  type="date"
                  value={formData.competitionEndDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, competitionEndDate: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Prizes Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Prizes</h3>
              <button
                type="button"
                onClick={addPrize}
                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Prize</span>
              </button>
            </div>
            <div className="space-y-3">
              {formData.prizes.map((prize, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border border-gray-200 rounded-lg"
                >
                  <div>
                    <input
                      value={prize.name}
                      onChange={(e) => updatePrize(index, "name", e.target.value)}
                      placeholder={`Prize ${index + 1} name (e.g., 1st Place)`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      value={prize.description}
                      onChange={(e) => updatePrize(index, "description", e.target.value)}
                      placeholder="Prize description (e.g., Trophy + Rp 5.000.000)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.prizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePrize(index)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Rules</h3>
              <button
                type="button"
                onClick={() => addArrayField("rules")}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Rule</span>
              </button>
            </div>
            <div className="space-y-3">
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="flex-1">
                    <textarea
                      value={rule}
                      onChange={(e) => updateArrayField("rules", index, e.target.value)}
                      placeholder={`Rule ${index + 1} (e.g., Each team must have minimum 5 players)`}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  {formData.rules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("rules", index)}
                      className="text-red-600 hover:text-red-700 p-1 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
              <button
                type="button"
                onClick={() => addArrayField("requirements")}
                className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 text-sm flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Requirement</span>
              </button>
            </div>
            <div className="space-y-3">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="flex-1">
                    <textarea
                      value={requirement}
                      onChange={(e) => updateArrayField("requirements", index, e.target.value)}
                      placeholder={`Requirement ${index + 1} (e.g., Valid student ID or school certificate)`}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("requirements", index)}
                      className="text-red-600 hover:text-red-700 p-1 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>
                {isLoading
                  ? editingCompetition
                    ? "Updating..."
                    : "Adding..."
                  : editingCompetition
                    ? "Update Competition"
                    : "Add Competition"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<AdminBasicInfoResponse | null>(null)
  const [allTeams, setAllTeams] = useState<Team[]>([])
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null)
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [competitionStats, setCompetitionStats] = useState<CompetitionStats[]>([])

  // Calculate competition statistics

  // Team management state
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Modal states
  const [isAddCompetitionOpen, setIsAddCompetitionOpen] = useState(false)
  const [viewingCompetition, setViewingCompetition] = useState<Competition | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewingTeam, setViewingTeam] = useState<Team | null>(null)
  const [isTeamViewModalOpen, setIsTeamViewModalOpen] = useState(false)

  const { showSuccess, showError } = useToast()

  useEffect(() => {
    const loadAdminData = async () => {
      
      const token = await (await fetch("/api/token")).json();
      // Load user profile data

      try {
        const basicInfo = await fetchAdminBasicInfo(token.token);
        setStats(basicInfo);
      } catch (error: any) {
        if (error.response) {
          const errorMessage = error.response.data.error;
          showError("Failed to fetch basic info", errorMessage);
        } else if (error.request) {
          console.error("Failed to fetch basic info: No response received", error.request);
        } else {
          console.error("Failed to fetch basic info:", error.message);
        }
      }

      try {
        const competitionsRes = await fetchCompetitions();
        setCompetitions(competitionsRes || []);
      } catch (error: any) {
        if (error.response) {
          const errorMessage = error.response.data.error;
          showError("Failed to fetch basic info", errorMessage);
        } else if (error.request) {
          console.error("Failed to fetch basic info: No response received", error.request);
        } else {
          console.error("Failed to fetch basic info:", error.message);
        }
      }

      try {
        const teamRes = await fetchAllTeams(token.token);
        if (teamRes != null) {
          teamRes.forEach((competition) => {
            if (competition.members == null) {
              competition.members = [];
            }
          });
        }
        setAllTeams(teamRes || []);
      } catch (error: any) {
        if (error.response) {
          const errorMessage = error.response.data.error;
          showError("Failed to fetch basic info", errorMessage);
        } else if (error.request) {
          console.error("Failed to fetch basic info: No response received", error.request);
        } else {
          console.error("Failed to fetch basic info:", error.message);
        }
      }

      try {
        const competitionStatsRes = await fetchAdminCompetitionStats(token.token);
        console.log("Competition Stats:", competitionStatsRes);
        setCompetitionStats(competitionStatsRes ?? []);
        setIsLoading(false)
      } catch (error: any) {
        if (error.response) {
          const errorMessage = error.response.data.error;
          showError("Failed to fetch basic info", errorMessage);
        } else if (error.request) {
          console.error("Failed to fetch basic info: No response received", error.request);
        } else {
          console.error("Failed to fetch basic info:", error.message);
        }
      }
    }

    loadAdminData()
  }, [])

  // Filter and paginate teams
  const filteredTeams = allTeams.filter((team) => {
    const matchesSearch =
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.teamCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.teamLeader.fullName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || team.competition.category === filterCategory
    const matchesPaymentStatus =
      filterPaymentStatus === "all" ||
      (filterPaymentStatus === "paid" && team.isPaid) ||
      (filterPaymentStatus === "pending" && !team.isPaid)

    return matchesSearch && matchesCategory && matchesPaymentStatus
  })

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTeams = filteredTeams.slice(startIndex, startIndex + itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterCategory, filterPaymentStatus])

  // Competition handlers
  const handleAddCompetition = async (competitionData: Competition) => {
    if (editingCompetition) {
      setCompetitions((prev) => prev.map((comp) => (comp.id === editingCompetition.id ? competitionData : comp)))
      showSuccess("Competition Updated", `${competitionData.name} has been updated successfully.`)
    } else {
      try {
        const token = await (await fetch("/api/token")).json();
        const addCompRes = await addCompetition(token.token, competitionData);
        if (addCompRes) {
          competitionData.id = addCompRes.competitionId; // Set the ID from the response
          setCompetitions((prev) => [...prev, competitionData])
          showSuccess("Competition Added", `${competitionData.name} has been added successfully.`)
        }
      } catch (error: any) {
        if (error.response) {
          const errorMessage = error.response.data.error;
          showError("Failed to add competition", errorMessage);
        } else if (error.request) {
          console.error("Failed to add competition: No response received", error.request);
        } else {
          console.error("Failed to add competition:", error.message);
        }
      }
    }
    setEditingCompetition(null)
  }

  const handleEditCompetition = (competition: Competition) => {
    setEditingCompetition(competition)
    setIsAddCompetitionOpen(true)
  }

  const handleDeleteCompetition = (competitionId: string) => {
    if (confirm("Are you sure you want to delete this competition? This action cannot be undone.")) {
      const competition = competitions.find((c) => c.id === competitionId)
      setCompetitions((prev) => prev.filter((comp) => comp.id !== competitionId))
      showSuccess("Competition Deleted", `${competition?.name} has been deleted successfully.`)
    }
  }

  const handleViewCompetition = (competition: Competition) => {
    setViewingCompetition(competition)
    setIsViewModalOpen(true)
  }

  // Team handlers
  const handleViewTeam = (team: Team) => {
    setViewingTeam(team)
    setIsTeamViewModalOpen(true)
  }

  const handleDeleteTeam = (teamId: string) => {
    if (confirm("Are you sure you want to delete this team? This action cannot be undone.")) {
      const team = allTeams.find((t) => t.id === teamId)
      // In a real app, this would delete the team from the database
      showSuccess("Team Deleted", `${team?.teamName} has been deleted successfully.`)
    }
  }

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
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Admin Dashboard...</h3>
          <p className="text-gray-500">Fetching statistics and data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage competitions, teams, and view platform statistics</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-900">{stats?.totalUsers || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <span className="text-blue-600">
              <GraduationCap className="w-4 h-4 inline mr-1" />
              {stats?.binusianUsers || 0} Binusian
            </span>
            <span className="text-green-600">
              <School className="w-4 h-4 inline mr-1" />
              {stats?.nonBinusianUsers || 0} Non-Binusian
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teams</p>
              <p className="text-2xl font-bold text-blue-900">{stats?.totalTeams || 0}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Competitions</p>
              <p className="text-2xl font-bold text-blue-900">{stats?.activeCompetitions || 0}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-amber-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{stats?.upcomingEvents || 0} upcoming events</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-blue-900">
                {stats?.totalParticipants || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-purple-600">
              <PieChart className="w-4 h-4 mr-1" />
              <span>Across {stats?.categoryCount} categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Competition Statistics Carousel */}
      <CompetitionCarousel competitions={competitionStats} />

      {/* Competitions Management */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4 sm:mb-0">
            <Trophy className="w-5 h-5 mr-2" />
            Competitions Management
          </h2>
          <button
            onClick={() => setIsAddCompetitionOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Competition</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {competitions.map((competition) => (
            <div key={competition.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{competition.name}</h3>
                  <p className="text-sm text-gray-600">
                    {competition.category} • {competition.competitionType}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Active</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {competition.venue}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Registration: {formatDate(competition.registrationStartDate)} -{" "}
                  {formatDate(competition.registrationEndDate)}
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {formatCurrency(competition.registrationfee)}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="bg-green-50 p-2 rounded">
                    <span className="font-medium text-green-800">Prizes:</span>
                    <p className="text-green-600">{competition.prizes?.length || 0} items</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <span className="font-medium text-blue-800">Rules:</span>
                    <p className="text-blue-600">{competition.rules?.length || 0} items</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <span className="font-medium text-purple-800">Requirements:</span>
                    <p className="text-purple-600">{competition.requirements?.length || 0} items</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-medium text-blue-600">
                    {competition.minMembers}-{competition.maxMembers} members
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewCompetition(competition)}
                      className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditCompetition(competition)}
                      className="text-gray-600 hover:text-gray-700 p-1 rounded hover:bg-gray-50"
                      title="Edit Competition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCompetition(competition.id)}
                      className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      title="Delete Competition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teams Management */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4 sm:mb-0">
            <Users className="w-5 h-5 mr-2" />
            Teams Management ({filteredTeams.length})
          </h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Basketball">Basketball</option>
              <option value="Futsal">Futsal</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Badminton">Badminton</option>
              <option value="E-Sports">E-Sports</option>
              <option value="Table Tennis">Table Tennis</option>
            </select>
            <select
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competition
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leader
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{team.teamName}</div>
                      <div className="text-sm text-gray-500">Code: {team.teamCode}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{team.competition.name}</div>
                    <div className="text-sm text-gray-500">{team.competition.category}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Crown className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{team.teamLeader.fullName}</div>
                        <div className="text-sm text-gray-500">
                          {team.teamLeader.binusian ? team.teamLeader.nim : "Non-Binusian"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{team.members.length} members</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min((team.members.length / (team.competition.maxMembers || 8)) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        team.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {team.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewTeam(team)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                        title="View Team Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeam(team.id)}
                        className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                        title="Delete Team"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredTeams.length}
        />
      </div>

      {/* Modals */}
      <AddCompetitionModal
        isOpen={isAddCompetitionOpen}
        onClose={() => {
          setIsAddCompetitionOpen(false)
          setEditingCompetition(null)
        }}
        onSave={handleAddCompetition}
        editingCompetition={editingCompetition}
      />

      <CompetitionViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setViewingCompetition(null)
        }}
        competition={viewingCompetition}
      />

      <TeamViewModal
        isOpen={isTeamViewModalOpen}
        onClose={() => {
          setIsTeamViewModalOpen(false)
          setViewingTeam(null)
        }}
        team={viewingTeam}
      />
    </div>
  )
}
