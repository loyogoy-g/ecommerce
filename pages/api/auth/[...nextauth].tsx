import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: "AP MALL",
      credentials: {
        id: {
          type: "text",
        },
        password: {
          type: "text",
        },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              userId: credentials ? credentials.id : "",
            },
          });
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
  });
}
