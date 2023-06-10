-- CreateTable
CREATE TABLE "_tweetsTousers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_tweetsTousers_AB_unique" ON "_tweetsTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_tweetsTousers_B_index" ON "_tweetsTousers"("B");

-- AddForeignKey
ALTER TABLE "_tweetsTousers" ADD CONSTRAINT "_tweetsTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tweetsTousers" ADD CONSTRAINT "_tweetsTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
