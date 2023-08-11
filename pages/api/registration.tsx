import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

interface createUser {
  id: string;
  name: string | null;
  userId: string;
  password: string;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type Data = {
  message: createUser | string;
};

type BodyPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { firstName, email, lastName, password } = req.body as BodyPayload;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const create_user = await prisma.user.create({
    data: {
      name: firstName + " " + lastName,
      email,
      password: "password",
      userId: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return res.status(200).json({ message: create_user });
}
