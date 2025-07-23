import type { Competition } from "@/model/competition_model";
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Enable sending cookies and credentials for CORS
});

export async function fetchCompetitions(): Promise<Competition[]> {
  try {
    const res = await axiosInstance.get<Competition[]>("competitions");
    return res.data;
  } catch (err) {
    console.error("Error fetching competitions:", err);
    throw err;
  }
}

export async function fetchCompetitionByID(id: string): Promise<Competition> {
  try {
    const res = await axiosInstance.get<Competition>(`competitions/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching competitions:", err);
    throw err;
  }
}

export async function fetchRemainingTeamSlot(competitionId: string): Promise<{ remainingSlots: number }> {
  try {
    const res = await axiosInstance.get<{ remainingSlots: number }>(`get-remaining-team-slot/${competitionId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching remaining team slots:", err);
    throw err;
  }
}

export async function pingIsPaidTeamSlot(teamId: string): Promise<{ isPaid: boolean; remainingSlots: number }> {
  try {
    const res = await axiosInstance.get<{ isPaid: boolean; remainingSlots: number }>(`ping-is-paid-team-slot/${teamId}`);
    return res.data;
  } catch (err) {
    console.error("Error checking if team slot is paid:", err);
    throw err;
  }
}