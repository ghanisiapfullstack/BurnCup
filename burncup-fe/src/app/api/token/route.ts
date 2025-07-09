import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const secret = process.env.AUTH_SECRET ?? "x+moMx7qVg46NDBVCsxguFtF+Oja6uy7NdFNOlV+Z7M=";
  const token = await getToken({ req, secret, raw: true, cookieName: "__Secure-next-auth.session-token" });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ token });
}