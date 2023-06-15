import RootApi from "../RootApi";

const CommentEndPoints = RootApi.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation({
      query: (payload) => ({
        url: "/comment/createComment",
        method: "POST",
        body: payload,
      }),
    }),
    updateComment: build.mutation({
      query: ({ data, id }) => ({
        url: `/comment/updateComment?id=${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteComment: build.mutation({
      query: ({ id }) => ({
        url: `/comment/deleteComment?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = CommentEndPoints;
