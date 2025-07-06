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
}

export interface Prize {
    id: string;
    name: string;
    description: string;
}