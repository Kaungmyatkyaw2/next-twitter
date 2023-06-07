import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;

  if (req.method === "GET") {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: "" + id,
        },
        select: {
          email: true,
          username: true,
          createdAt: true,
          id: true,
          updatedAt: true,
          followedBy: true,
          following: true,
        },
      });

      res.status(201).json({ isSuccess: true, data: user });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
