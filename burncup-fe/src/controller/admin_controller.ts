import { AdminBasicInfoResponse } from "@/model/admin_model";
import { CompetitionStats, Competition } from "@/model/competition_model";
import { Team } from "@/model/team_model";
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected`;

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Enable sending cookies and credentials for CORS
});

export async function fetchAdminBasicInfo(token: string): Promise<AdminBasicInfoResponse> {
  try {
    const res = await axiosInstance.get<AdminBasicInfoResponse>("admin-basic-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    throw err;
  }
}

export async function fetchAdminCompetitionStats(token: string): Promise<CompetitionStats[]> {
  try {
    const res = await axiosInstance.get<CompetitionStats[]>("admin-competitions-statistics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    throw err;
  }
}

export async function fetchAllTeams(token: string): Promise<Team[]> {
  try {
    const res = await axiosInstance.get<Team[]>("admin-all-teams", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    throw err;
  }
}

export async function addCompetition(token: string, competition: Competition): Promise<any> {
  try {
    const res = await axiosInstance.post(
      "admin-add-competition",
      {
        name: competition.name,
        description: competition.description,
        category: competition.category,
        imageUrl: competition.imageUrl,
        bookletUrl: competition.bookletUrl,
        paidMessage: competition.paidMessage,
        registrationStartDate: competition.registrationStartDate,
        registrationEndDate: competition.registrationEndDate,
        competitionStartDate: competition.competitionStartDate,
        competitionEndDate: competition.competitionEndDate,
        competitionType: competition.competitionType,
        venue: competition.venue,
        registrationfee: competition.registrationfee,
        prizes: competition.prizes ?? [],
        requirements: competition.requirements ?? [],
        rules: competition.rules ?? [],
        maxMembers: competition.maxMembers ?? null,
        minMembers: competition.minMembers ?? null,
        teamSlot: competition.teamSlot,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error adding competition:", err);
    throw err;
  }
}

export async function updateCompetition(token: string, competition: Competition, compID: string): Promise<any> {
  try {
    const res = await axiosInstance.post(
      `admin-update-competition/${compID}`,
      {
        name: competition.name,
        description: competition.description,
        category: competition.category,
        imageUrl: competition.imageUrl,
        bookletUrl: competition.bookletUrl,
        paidMessage: competition.paidMessage,
        registrationStartDate: competition.registrationStartDate,
        registrationEndDate: competition.registrationEndDate,
        competitionStartDate: competition.competitionStartDate,
        competitionEndDate: competition.competitionEndDate,
        competitionType: competition.competitionType,
        venue: competition.venue,
        registrationfee: competition.registrationfee,
        prizes: competition.prizes ?? [],
        requirements: competition.requirements ?? [],
        rules: competition.rules ?? [],
        maxMembers: competition.maxMembers ?? null,
        minMembers: competition.minMembers ?? null,
        teamSlot: competition.teamSlot,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error adding competition:", err);
    throw err;
  }
}

export async function deleteTeam(token: string, teamCode: string): Promise<any> {
  try {
    const res = await axiosInstance.delete(
      `admin-delete-team/${teamCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error deleting team:", err);
    throw err;
  }
}

export async function deleteCompetition(token: string, competitionId: string): Promise<any> {
  try {
    const res = await axiosInstance.delete(
      `admin-delete-competition/${competitionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error deleting competition:", err);
    throw err;
  }
}