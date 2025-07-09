import NextAuth from "next-auth"
import { SignJWT, jwtVerify } from "jose";
import Google from "next-auth/providers/google"

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
      strategy: "jwt",
    },
    jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    async encode({ token, maxAge }) {
      return new SignJWT(token as any)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${maxAge ?? 30 * 24 * 60 * 60}s`) // default to 30 days
        .sign(secret);
    },
    async decode({ token }) {
      if (!token) return null;
      const { payload } = await jwtVerify(token, secret);
      return payload;
    },
  },
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        },
      },
    })
    ],
  callbacks: {
    async jwt({ token, account, user}) {
      // When user logs in for the first time
      if (account) {
        token.userId = user.id;
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId as string;
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
})