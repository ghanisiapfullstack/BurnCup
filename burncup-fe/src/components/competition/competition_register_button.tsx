"use client";

import { useRouter } from "next/navigation";

export default function CompetitionRegisterButton({
    competitionId,
    className = "",
}: {
    competitionId: string;
    className?: string;
}) {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                router.push(`/register/${competitionId}`);
            }}
            className={`mt-4 px-6 py-2 bg-text-primary text-[#720606] font-bold rounded-lg hover:opacity-60 transition-opacity ${className}`}
        >
            Register Now
        </button>
    );
}