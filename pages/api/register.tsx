import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";
import { sendEmail } from "@/lib/emailservice";
import { CustomerData } from "@/storage";
import { PrismaClient } from "@prisma/client";

interface Registration {
  email: string;
  firstName: string;
  password: string;
  postalCode: string;
  street: string;
  phoneNumber: string;
}

interface ErrorResponse {
  message: string;
}

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { registrationData }: { registrationData: Registration } = JSON.parse(
      req.body
    );

    const data = {
      email: registrationData.email,
      first_name: registrationData.firstName,
      last_name: "",
      username: registrationData.firstName,
      billing: {
        first_name: registrationData.firstName,
        last_name: "",
        company: "",
        address_1: registrationData.street,
        address_2: "",
        city: "KOREA",
        state: "KOREA",
        postcode: registrationData.postalCode,
        country: "KOREA",
        email: registrationData.email,
        phone: registrationData.phoneNumber,
      },
      shipping: {
        first_name: registrationData.firstName,
        last_name: "",
        company: "",
        address_1: registrationData.street,
        address_2: "",
        city: "KOREA",
        state: "KOREA",
        postcode: registrationData.postalCode,
        country: "KOREA",
      },
    };

    const result = await woocommerce.post("customers", data);
    const fixerResult = await woocommerceFixer(result);
    const { id } = fixerResult;
    const createUser = await prisma.user.create({
      data: {
        email: registrationData.email,
        woocommerceId: id,
        password: registrationData.password,
        name: registrationData.firstName,
      },
    });
    return res.status(200).json({ status: true, message: createUser });
  } catch (error) {
    try {
      const { message } = error as ErrorResponse;
      if (message == "Request failed with status code 400") {
        return res
          .status(200)
          .json({ status: false, message: "User already Exist", error });
      }
      return res.status(200).json({ status: false, message: "Unknown error" });
    } catch (error) {
      return res.status(200).json({ status: false, message: "Unknown error" });
    }
  }
}
