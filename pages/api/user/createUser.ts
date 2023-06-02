import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";
import { SignupFormData } from "@/validation";
import { Prisma } from "@prisma/client";
import argon from "argon2";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload: Omit<SignupFormData, "confirmPassword"> = req.body;

  if (req.method === "POST") {
    try {
      const hashedPassword = await argon.hash(payload.password);

      const user = await prisma.users.create({
        data: { ...payload, password: hashedPassword },
      });

      res.status(201).json({ isSuccess: true, data: user });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == "P20002") {
          res
            .status(400)
            .json({ message: "This email was already registered", error });
        } else {
          res.status(400).json({ message: "Something went wrong", error });
        }
      }
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
