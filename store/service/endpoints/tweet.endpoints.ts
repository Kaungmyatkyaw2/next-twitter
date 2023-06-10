import RootApi from "../RootApi";

const TweetEndPoints = RootApi.injectEndpoints({
  endpoints: (build) => ({
    createTweet: build.mutation({
      query: (payload) => ({
        url: "/tweet/createTweet",
        method: "POST",
        body: payload,
      }),
    }),
    updateTweet: build.mutation({
      query: ({ data, id }) => ({
        url: `/tweet/updateTweet?id=${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getTweets: build.query({
      query: ({ take, skip }) => ({
        url: `/tweet/getTweets?skip=${skip}&take=${take}`,
        method: "GET",
      }),
    }),
    getTweetsByUser: build.query({
      query: ({ take, skip, userId }) => ({
        url: `/tweet/getTweetsByUser?skip=${skip}&take=${take}&userId=${userId}`,
        method: "GET",
      }),
    }),
    deleteTweet: build.mutation({
      query: ({ id }) => ({
        url: `/tweet/deleteTweet?id=${id}`,
        method: "DELETE",
      }),
    }),
    reactTweet: build.mutation({
      query: (payload) => ({
        url: `/tweet/reactTweet`,
        method: "POST",
        body: payload,
      }),
    }),
    unreactTweet: build.mutation({
      query: ({ userId, tweetId }) => ({
        url: `/tweet/unreactTweet?userId=${userId}&tweetId=${tweetId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTweetMutation,
  useLazyGetTweetsQuery,
  useDeleteTweetMutation,
  useUpdateTweetMutation,
  useLazyGetTweetsByUserQuery,
  useReactTweetMutation,
  useUnreactTweetMutation,
} = TweetEndPoints;
