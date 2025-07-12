import type { Competition } from "@/model/competition_model";
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: false, // Enable sending cookies and credentials for CORS
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