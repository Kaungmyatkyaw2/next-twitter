import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: () => ({}),
});

export default RootApi;
