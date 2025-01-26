import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include", // must need to set credentials or else cookies will not be set in browser
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; //? understand how getState works
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers; //* must set header or the backend will not recieve auth token
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
});
