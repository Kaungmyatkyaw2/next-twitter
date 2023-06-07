import RootApi from "../RootApi";

const AuthEndPoints = RootApi.injectEndpoints({
  endpoints: (build) => ({
    getme: build.query({
      query: ({ id }) => ({
        url: `/user/getUser?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetmeQuery } = AuthEndPoints;
