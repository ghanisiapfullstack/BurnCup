import { Competition } from "./competition_model";
import { User } from "./user_model";

export interface Team {
  id: string;
  teamName: string;
  teamCode: string;
  isPaid: boolean;
  competition: Competition;
  members: User[];
  teamLeader: User; // user ID of the team leader
  createdAt: string;
  updatedAt: string;
}
