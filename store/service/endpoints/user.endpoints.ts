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
  }),
});

export const { useSignupMutation } = UserEndPoints;
