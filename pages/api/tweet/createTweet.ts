import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload: {
    image: string | undefined;
    caption: string | undefined;
    userId: string;
  } = req.body;

  if (req.method === "POST") {
    try {
      const tweet = await prisma.tweets.create({
        data: payload,
        include: {
          user: {
            include : {
              followedBy: true,
            following: true,
            }
          },
        },
      });

      res.status(201).json({ isSuccess: true, data: tweet });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
