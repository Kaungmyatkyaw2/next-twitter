/*
  Warnings:

  - You are about to drop the `tweet_reactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tweet_reactions" DROP CONSTRAINT "tweet_reactions_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "tweet_reactions" DROP CONSTRAINT "tweet_reactions_userId_fkey";

-- DropTable
DROP TABLE "tweet_reactions";

-- CreateTable
CREATE TABLE "tweetReactions" (
    "userId" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,

    CONSTRAINT "tweetReactions_pkey" PRIMARY KEY ("userId","tweetId")
);

-- AddForeignKey
ALTER TABLE "tweetReactions" ADD CONSTRAINT "tweetReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweetReactions" ADD CONSTRAINT "tweetReactions_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
