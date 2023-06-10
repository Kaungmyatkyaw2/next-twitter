/*
  Warnings:

  - You are about to drop the `_tweetsTousers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_tweetsTousers" DROP CONSTRAINT "_tweetsTousers_A_fkey";

-- DropForeignKey
ALTER TABLE "_tweetsTousers" DROP CONSTRAINT "_tweetsTousers_B_fkey";

-- DropTable
DROP TABLE "_tweetsTousers";

-- CreateTable
CREATE TABLE "tweet_reactions" (
    "userId" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,

    CONSTRAINT "tweet_reactions_pkey" PRIMARY KEY ("userId","tweetId")
);

-- AddForeignKey
ALTER TABLE "tweet_reactions" ADD CONSTRAINT "tweet_reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_reactions" ADD CONSTRAINT "tweet_reactions_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
