import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { take, skip, userId }: any = req.query;

  if (req.method === "GET") {
    try {
      const countOfTweets = await prisma.savedTweet.count({
        where: {
          userId,
        },
      });

      const tweets = await prisma.savedTweet.findMany({
        where: {
          userId,
        },
        include: {
          tweet: {
            include: {
              tweetComments: true,
              tweetReactions: {
                include: {
                  user: true,
                },
              },
              user: true,
            },
          },
          user: true,
        },
        take: +take,
        skip: +skip,
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(201).json({
        isSuccess: true,
        data: tweets,
        maxSkip: Math.ceil(countOfTweets / take),
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
