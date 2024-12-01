/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../api/apiSlice";

const LinkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

    //reorderLink
    reorderLink: builder.mutation({
      query: (body: any) => ({
        url: "/reorderLink",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  usePostLinkMutation,
  useGetLinksQuery,
  useDeleteOneLinkMutation,
  useReorderLinkMutation,
} = LinkApiSlice;
