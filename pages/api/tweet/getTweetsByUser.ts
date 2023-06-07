import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { take, skip, userId }: any = req.query;

  if (req.method === "GET") {
    try {
      const tweets = await prisma.tweets.findMany({
        where: {
          userId,
        },
        include: {
          user: {
            include: {
              followedBy: true,
              following: true,
            },
          },
        },
        take: +take,
        skip: +skip,
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(201).json({ isSuccess: true, data: tweets });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
