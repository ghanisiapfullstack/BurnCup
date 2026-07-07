import type { Competition } from "@/model/competition_model";
import axios from "axios";

const publicBackendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function getBackendBaseURL() {
  if (typeof window === "undefined") {
    return process.env.BACKEND_INTERNAL_URL ?? publicBackendBaseURL;
  }

  return publicBackendBaseURL;
}

function getCompetitionsURL() {
  return `${getBackendBaseURL()}/api/competitions`;
}

const baseURL = `${publicBackendBaseURL}/api`;

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Enable sending cookies and credentials for CORS
});

async function fetchCompetitionJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchCompetitions(): Promise<Competition[]> {
  try {
    return await fetchCompetitionJson<Competition[]>(getCompetitionsURL());
  } catch (err) {
    console.error("Error fetching competitions:", err);
    throw err;
  }
}

export async function fetchCompetitionByID(id: string): Promise<Competition> {
  try {
    return await fetchCompetitionJson<Competition>(`${getCompetitionsURL()}/${id}`);
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