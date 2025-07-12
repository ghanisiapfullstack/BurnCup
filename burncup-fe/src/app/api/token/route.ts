import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, raw: true, cookieName: process.env.NODE_ENV == "production" ? "__Secure-authjs.session-token" : undefined});

  if (!token) {
    return NextResponse.json({ message: `Unauthorized` }, { status: 401 });
  }

  return NextResponse.json({ token });
}