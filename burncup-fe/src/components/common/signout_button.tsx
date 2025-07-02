"use client";

import { signOut } from "@/lib/core/auth";

export default function SignOutButton({ className = "" }: {
    className?: string;
}) {
    return (
        <button
            onClick={() => signOut()}
            className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${className}`}
        >
            Sign Out
        </button>
    );
}