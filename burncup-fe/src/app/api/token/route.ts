import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.AUTH_SECRET ?? "x+moMx7qVg46NDBVCsxguFtF+Oja6uy7NdFNOlV+Z7M=";

export async function GET(req: Request) {
  const token = await getToken({ req, secret, raw: true });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ token });
}