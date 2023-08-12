import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: "AP MALL",
      credentials: {
        email: {
          type: "text",
        },
        password: {
          type: "text",
        },
      },
      async authorize(credentials) {
        try {
          if (credentials) {
            const { email, password } = credentials;
            const user = await prisma.user.findUnique({
              where: {
                email,
              },
            });
            if (user) {
              const { password } = user;
              const validPassword = password == credentials.password;
              console.log(validPassword);
              if (validPassword) {
                return user;
              }
              return null;
            }
            return null;
          }
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
    callbacks: {
      redirect({ baseUrl, url }) {
        return baseUrl;
      },
    },
    pages: {
      signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
  });
}
