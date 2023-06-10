import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";
import { deleteImage } from "@/firebase/helper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    tweetId,
    userId,
  }: {
    tweetId: string;
    userId: string;
  } = req.body;

  if (req.method === "POST") {
    try {
      const reaction = await prisma.tweetReactions.create({
        data: {
          tweetId,
          userId,
        },
      });

      if (reaction) {
        res.status(201).json({ isSuccess: true, data: reaction });
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
