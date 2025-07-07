import { Team } from "@/model/team_model";
import type { User } from "@/model/user_model";
import axios from "axios";

const baseURL = "http://host.docker.internal:8000/api/protected";

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: false,
});

export async function fetchCurrentTeams(token: string): Promise<Team[]> {
  try {
    console.log("Fetching teams");
    const res = await axiosInstance.get<Team[]>("get-teams", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched teams:", res.data);
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