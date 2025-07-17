import { QRPaymentResponse } from "@/model/payment_model";
import { Team } from "@/model/team_model";
import type { User } from "@/model/user_model";
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected`;

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export async function fetchCurrentTeams(token: string): Promise<Team[]> {
  try {
    const res = await axiosInstance.get<Team[]>("get-teams", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
}

export async function CreateTeam(token: string, teamName: string, compId: string): Promise<User> {
  try {
    const res = await axiosInstance.post(
      "create-team",
      {
          competitionId: compId,
        teamName: teamName,
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
    console.error("Error updating user:", err);
    throw err;
  }
}

export async function JoinTeamByCode(token: string, teamCode: string, compId: string): Promise<User> {
  try {
    const res = await axiosInstance.post(
      "join-team",
      {
        TeamCode: teamCode,
          competitionId: compId,
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
    console.error("Error updating user:", err);
    throw err;
  }
}

export async function fetchTeamQrUrl(teamCode: string, token: string): Promise<QRPaymentResponse> {
  try {
    const res = await axiosInstance.get<QRPaymentResponse>(`get-qr-link/${teamCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching team QR URL:", err);
    throw err;
  }
}