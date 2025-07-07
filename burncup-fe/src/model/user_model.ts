export interface User {
    binusian: boolean;
    fullName: string;
    email: string;
    phoneNumber: string;
    // Binusian specific
    nim?: string | null;
    major?: string | null;
    // Non-Binusian specific
    school?: string | null;
}