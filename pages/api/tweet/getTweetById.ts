import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;

  if (req.method === "GET") {
    try {
      const tweet = await prisma.tweets.findUnique({
        where: { id },
        include: {
          user: {
            include: {
              followedBy: true,
              following: true,
            },
          },
          tweetReactions: true,
          savedTweet: true,
          tweetComments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      res.status(200).json({
        isSuccess: true,
        data: tweet,
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
