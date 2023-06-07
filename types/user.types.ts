import { users } from "@prisma/client";
import { Tweet } from "./tweet.types";

export interface User extends users {
  tweets: Tweet[];
  following: User[];
  followedBy: User[];
}
