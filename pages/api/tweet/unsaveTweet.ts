import { prisma } from "@/lib";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tweetId, userId }: any = req.query;

  if (req.method === "DELETE") {
    try {
      const delSavedTweet = await prisma.savedTweet.delete({
        where: {
          userId_tweetId: {
            tweetId,
            userId,
          },
        },
      });

      if (delSavedTweet) {
        res.status(200).json({ data: delSavedTweet, isSuccess: true });
      }
    } catch (error) {
      res.status(400).json({ error, message: "Something went wrong !" });
    }
  } else {
    res.status(409).json({ message: "Invalid Method", isOk: false });
  }
};
