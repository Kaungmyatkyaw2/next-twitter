import { apiInstance } from ".";

export async function axiosFetchTweets({
  skip,
  take,
}: {
  skip: number;
  take: number;
}) {
  return await apiInstance.get(`/tweet/getTweets?take=${take}&skip=${skip}`);
}

export async function axiosFetchTweetsByUser({
  skip,
  take,
  userId,
}: {
  skip: number;
  take: number;
  userId: string;
}) {
  return await apiInstance.get(
    `/tweet/getTweetsByUser?take=${take}&skip=${skip}&userId=${userId}`
  );
}
