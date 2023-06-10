import { tweetReactions, tweets } from "@prisma/client";
import { User } from "./user.types";

export interface Tweet extends tweets {
  user: User;
  tweetReactions: tweetReactions[];
}
