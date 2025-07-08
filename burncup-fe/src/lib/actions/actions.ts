"use server";

import { auth, signIn, signOut} from "@/lib/core/auth";

export const login = async () => {
    await signIn();
};

export const loginWithProvider = async (provider: string, redirect?: string | null) => {
    if (redirect) {
        await signIn(provider, { callbackUrl: redirect });
    } else {
        await signIn(provider);
    }
    
}

export const logout = async () => {
    await signOut({redirectTo: "/"});
};

export const getCurrentSession = async () => {
    const session = await auth();
    return session;
}