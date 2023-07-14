import RootApi from "../RootApi";

const UserEndPoints = RootApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (payload) => ({
        url: "/user/createUser",
        method: "POST",
        body: payload,
      }),
    }),
    getUser: build.query({
      query: ({ id }) => ({
        url: `/user/getUser?id=${id}`,
        method: "GET",
      }),
    }),
    followUser: build.mutation({
      query: (payload) => ({
        url: "/user/followUser",
        method: "PATCH",
        body: payload,
      }),
    }),
    unfollowUser: build.mutation({
      query: (payload) => ({
        url: "/user/unfollowUser",
        method: "PATCH",
        body: payload,
      }),
    }),
    getFollowers: build.query({
      query: ({ take, id, skip }) =>
        `user/getFollowers?id=${id}&take=${take}&skip=${skip}`,
    }),
    getFollowings: build.query({
      query: ({ take, id, skip }) =>
        `user/getFollowings?id=${id}&take=${take}&skip=${skip}`,
    }),
  }),
});

export const {
  useSignupMutation,
  useLazyGetUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useLazyGetFollowersQuery,
  useLazyGetFollowingsQuery,
} = UserEndPoints;
