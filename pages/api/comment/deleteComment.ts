import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";
import { deleteImage } from "@/firebase/helper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;

  if (req.method === "DELETE") {
    try {
      const targetComment = await prisma.tweetComments.findUnique({
        where: {
          id: id,
        },
      });

      if (!targetComment) {
        res.status(400).json({ message: "Tweet doesn't found !" });
      }

      const deleteComment = await prisma.tweetComments.delete({
        where: {
          id: targetComment?.id,
        },
      });

      res.status(200).json({ isSuccess: true, data: deleteComment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "Invalid Method" });
  }
};

export default handler;
