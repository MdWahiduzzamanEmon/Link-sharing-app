/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../api/apiSlice";

const LinkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: {
    mutation: (arg0: {
      query: (body: any) => {
        url: string;
        method: string;
        body?: any;
      };
      invalidatesTags?: string[];
    }) => any;
    query: (arg0: {
      query: () => { url: string; method: string };
      providesTags?: string[];
    }) => any;
  }) => ({
    postLink: builder.mutation({
      query: (body: any) => ({
        url: "/saveLinks",
        method: "POST",
        body,
      }),

      invalidatesTags: ["links"],
    }),

    //getLinks

    getLinks: builder.query({
      query: () => ({
        url: "/getLinks",
        method: "GET",
      }),

      providesTags: ["links"],
    }),

    //delete one link
    deleteOneLink: builder.mutation({
      query: (id: string) => ({
        url: `/deleteOneLink/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["links"],
    }),
  }),
});

export const {
  usePostLinkMutation,
  useGetLinksQuery,
  useDeleteOneLinkMutation,
} = LinkApiSlice;
