export interface Competition {
    id: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    registrationStartDate: string;
    registrationEndDate: string;
    competitionStartDate: string;
    competitionEndDate: string;
    competitionType: string; // e.g., "Binusian", "NonBinusian", "Mixed"
    venue: string;
    registrationfee: number;
    prizes: Prize[];
    requirements: string[];
    rules: string[];
    maxMembers?: number; // Optional, for team competitions
    minMembers?: number; // Optional, for team competitions
    teamSlot: number; // Number of teams that can register
}

export interface Prize {
    id: string;
    name: string;
    description: string;
}

export interface CompetitionStats {
  id: string
  name: string
  category: string
  totalTeams: number
  totalParticipants: number
  paidTeams: number
  pendingTeams: number
  registrationFee: number
  competitionType: string
}

export interface CompetitionCarouselProps {
  competitions: CompetitionStats[]
}