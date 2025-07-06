"use client";

import { logout } from "@/lib/actions/actions";

export default function SignOutButton({ className = "" }: {
    className?: string;
}) {
    return (
        <button
            onClick={async () => await logout()}
            className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${className}`}
        >
            Sign Out
        </button>
    );
}