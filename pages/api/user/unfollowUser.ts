import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib";
import { deleteImage } from "@/firebase/helper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload: {
    userId: string;
    followUserId: string;
  } = req.body;

  if (req.method === "PATCH") {
    try {
      const toUnfollowUser = await prisma.users.update({
        where: {
          id: payload.userId,
        },
        data: {
          following: {
            disconnect: {
              id: payload.followUserId,
            },
          },
        },
      });

      if (toUnfollowUser) {
        const unfollowedUser = await prisma.users.update({
          where: {
            id: payload.followUserId,
          },
          data: {
            followedBy: {
              disconnect: {
                id: payload.userId,
              },
            },
          },
          include: {
            followedBy: true,
            following: true,
          },
        });

        res.status(200).json({ isSuccess: true, data: unfollowedUser });
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
