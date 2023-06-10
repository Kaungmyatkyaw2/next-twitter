import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { take, skip }: any = req.query;

  if (req.method === "GET") {
    try {
      const countOfTweets = await prisma.tweets.count({});

      const tweets = await prisma.tweets.findMany({
        include: {
          user: {
            include: {
              followedBy: true,
              following: true,
            },
          },
          tweetReactions: true,
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
        maxSkip: Math.ceil(countOfTweets / 2),
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
