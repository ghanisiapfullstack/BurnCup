import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.AUTH_SECRET!;

export async function GET(req: Request) {
  const token = await getToken({ req, secret, raw: true });

  console.log("Token:", token);
  console.log("secret:", secret);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ token });
}