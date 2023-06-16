import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";
import { deleteImage } from "@/firebase/helper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;
  const payload: {
    image: string | undefined;
    caption: string | undefined;
  } = req.body;

  if (req.method === "PATCH") {
    try {
      const targetTweet = await prisma.tweets.findUnique({
        where: { id },
      });

      if (!targetTweet) {
        res.status(400).json({ message: "Tweet doesn't found !" });
      } else {
        if (targetTweet.image?.length && targetTweet?.image !== payload.image) {
          await deleteImage(targetTweet.image);
        }
        const tweet = await prisma.tweets.update({
          where: { id },
          data: payload,
          include: {
            user: true,
            tweetReactions: true,
            tweetComments: {
              include: {
                user: true,
              },
            },
          },
        });


        res.status(200).json({ isSuccess: true, data: tweet });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
