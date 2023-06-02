import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: () => ({}),
});

export default RootApi;
