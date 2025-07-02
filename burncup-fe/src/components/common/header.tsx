"use server";

import { auth, signOut } from "@/lib/core/auth";
import Image from "next/image";
import '@/app/globals.css';
import SignOutButton from "./signout_button";
export default async function Header() {
    const session = await auth();
    console.log("Session:", session);

    return (
        <header className="flex items-center justify-between px-4 py-1 bg-gradient-to-r from-gradient-left-primary to-gradient-right-primary text-[#0F3064]">
            <div className="flex space-x-4 justify-center items-center">
                <Image
                    src="/images/burncup_logo.png"
                    alt="Burncup Logo"
                    width={100}
                    height={120}
                    className="rounded-full"
                />
                <h1 className="text-xl font-bold">BURNCUP 2025</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/contact" className="hover:underline">Competition</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                </ul>
            </nav>
            <div>
                {
                    session ? (
                        <div className="flex items-center space-x-2">
                            <Image
                                src={session.user?.image || "/images/default_avatar.png"}
                                alt="User Avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <span>{session.user?.name}</span>
                            <SignOutButton />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <p className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">You're not signed in</p>
                        </div>
                    )
                }
            </div>
        </header>
    );
}