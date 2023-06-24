import {
  savedTweet,
  tweetComments,
  tweetReactions,
  tweets,
} from "@prisma/client";
import { User } from "./user.types";

export interface TweetComment extends tweetComments {
  user: User;
}

export interface Tweet extends tweets {
  user: User;
  tweetReactions: tweetReactions[];
  tweetComments: TweetComment[];
  savedTweet: savedTweet[];
}

export interface SavedTweet extends savedTweet {
  user: User;
  tweet: Tweet;
}
