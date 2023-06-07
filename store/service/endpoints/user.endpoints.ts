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
  }),
});

export const { useSignupMutation, useLazyGetUserQuery, useFollowUserMutation,useUnfollowUserMutation } =
  UserEndPoints;
