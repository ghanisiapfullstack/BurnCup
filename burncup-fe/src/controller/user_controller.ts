import type { User } from "@/model/user_model";
import axios from "axios";

const baseURL = "https://apiburncuptesting.notchgnas.com/api/protected";

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: false,
});

export async function fetchCurrentUser(token: string): Promise<User> {
  try {
    const res = await axiosInstance.get<User>(`get-current-user`, {
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

export async function updateCurrentUser(token: string, user: User): Promise<User> {
  try {
    const res = await axiosInstance.post<User>(
      "create-update-user-profile",
      user,
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