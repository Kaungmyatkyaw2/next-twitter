import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, take, skip }: any = req.query;

  if (req.method === "GET") {
    try {
      const countOfFollowers = await prisma.users.count({
        where: {
          following: {
            some: {
              id: id,
            },
          },
        },
      });

      const user = await prisma.users.findMany({
        where: {
          following: {
            some: {
              id: id,
            },
          },
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
        take: +take,
        skip: +skip,
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(201).json({
        isSuccess: true,
        data: user,
        maxSkip: Math.ceil(countOfFollowers / take),
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
