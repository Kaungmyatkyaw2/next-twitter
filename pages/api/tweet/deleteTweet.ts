import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";
import { deleteImage } from "@/firebase/helper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;

  if (req.method === "DELETE") {
    try {
      const targetTweet = await prisma.tweets.findUnique({
        where: {
          id: id,
        },
      });

      if (!targetTweet) {
        res.status(400).json({ message: "Tweet doesn't found !" });
      }

      if (targetTweet?.image?.length) {
        await deleteImage(targetTweet.image);
      }

      const deleteTweet = await prisma.tweets.delete({
        where: {
          id: targetTweet?.id,
        },
      });

      await prisma.tweetComments.deleteMany({
        where: {
          tweetId: targetTweet?.id,
        },
      });

      await prisma.tweetReactions.deleteMany({
        where: {
          tweetId: targetTweet?.id,
        },
      });

      await prisma.savedTweet.deleteMany({
        where: {
          tweetId: targetTweet?.id,
        },
      });

      res.status(200).json({ isSuccess: true, data: deleteTweet });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
