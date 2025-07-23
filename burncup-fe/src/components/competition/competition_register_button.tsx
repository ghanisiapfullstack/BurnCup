"use client";

import { fetchRemainingTeamSlot } from "@/controller/competition_controller";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { useToast } from "../common/toast/toast-context";

const getTeamLeftColor = (slotLeft: number) => {
  if (slotLeft <= 3) {
    // Last 10 seconds: warning red
    return "bg-red-100 text-red-800";
  } else if (slotLeft <= 8) {
    // Last 1 minute: warning yellow
    return "bg-yellow-100 text-yellow-800";
  } else {
    // Default: blue
    return "bg-blue-100 text-blue-800";
  }
};

export default function CompetitionRegisterButton({
    competitionId,
    className = "",
}: {
    competitionId: string;
    className?: string;
}) {

    const [isLoading, setIsLoading] = useState(true);
    const [remainingTeamSlot, setRemainingTeamSlot] = useState<number>(0);

    const { showError } = useToast();

    const teamLeftColor = getTeamLeftColor(remainingTeamSlot);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const data = await fetchRemainingTeamSlot(competitionId);
                setRemainingTeamSlot(data.remainingSlots);
                setIsLoading(false);
            } catch (error: any) {
                if (error.response) {
                const errorMessage = error.response.data.error;
                showError("Failed to fetch team slot", errorMessage);
                } else if (error.request) {
                console.error("Failed to fetch team slot: No response received", error.request);
                } else {
                console.error("Failed to fetch team slot:", error.message);
                }
            }
        };

        fetchSlots();
    }, []);

    const router = useRouter();

    if (isLoading) {
        return <button className={`mt-4 px-6 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg ${className}`} disabled>Loading...</button>;
    }

    if (remainingTeamSlot <= 0) {
        return <button className={`mt-4 px-6 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg ${className}`} disabled>No slots available</button>;
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <button
                onClick={() => {
                    router.push(`/register/${competitionId}`);
                }}
                className={`mt-4 px-6 py-2 bg-text-primary text-[#720606] font-bold rounded-lg hover:opacity-60 transition-opacity ${className}`}
                >
                Register Now
            </button>
            <div className="flex items-center justify-center space-x-2 mb-3">
                <span className={`${teamLeftColor} px-2 md:px-3 py-1 rounded-lg font-mono font-semibold text-sm md:text-base`}>
                {remainingTeamSlot} slot{remainingTeamSlot > 1 ? 's' : ''} left
                </span>
            </div>
        </div>
    );
}