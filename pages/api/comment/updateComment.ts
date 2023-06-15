import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;
  const {
    description,
  }: {
    description: string;
  } = req.body;

  if (req.method === "PATCH") {
    try {
      const targetComment = await prisma.tweetComments.findUnique({
        where: { id },
      });

      if (!targetComment) {
        res.status(400).json({ message: "Comment doesn't found !" });
      } else {
        const comment = await prisma.tweetComments.update({
          where: { id },
          data: { description },
          include: {
            user: true,
          },
        });

        console.log(description);

        res.status(200).json({ isSuccess: true, data: comment });
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
