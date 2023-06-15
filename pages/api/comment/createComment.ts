import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    userId,
    description,
    tweetId,
  }: {
    userId: string;
    tweetId: string;
    description: string;
  } = req.body;

  if (req.method === "POST") {
    try {
      const tweetComment = await prisma.tweetComments.create({
        data: {
          userId,
          description,
          tweetId,
        },
        include : {
            user : true
        }
      });

      res.status(201).json({ isSuccess: true, data: tweetComment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
