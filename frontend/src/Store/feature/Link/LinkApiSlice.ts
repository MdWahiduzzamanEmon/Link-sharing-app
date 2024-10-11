/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../api/apiSlice";

const LinkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: {
    mutation: (arg0: {
      query: (body: any) => { url: string; method: string; body: any };
    }) => any;
  }) => ({
    postLink: builder.mutation({
      query: (body: any) => ({
        url: "/saveLinks",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {} = LinkApiSlice;
