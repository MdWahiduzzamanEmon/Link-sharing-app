/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { APIURL } from "../../Base";
// import {loginUserData} from '../feature/Auth_slice/Auth_slice';

const baseQuery = fetchBaseQuery({
  baseUrl: APIURL,
  prepareHeaders: async (headers, { getState }: any) => {
    const token = JSON.parse(localStorage.getItem("userData") || "{}")?.token;
    if (token) {
      headers.set("Authorization", token);
    }

    return headers;
  },
  credentials: "include",
});

const baseQueryWithRetry = async (
  args: Parameters<typeof baseQuery>[0],
  api: Parameters<typeof baseQuery>[1],
  extraOptions: Parameters<typeof baseQuery>[2]
) => {
  const result = await baseQuery(args, api, extraOptions);
  // const dispatch = api.dispatch;
  // console.log(api);
  // console.log('result', result?.meta?.response?.status);
  if (result?.meta?.response?.status === 401) {
    // api.dispatch(logOut());
    localStorage.removeItem("userData");
    window.location.reload();
    return result;
  } else {
    return result;
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry as unknown as BaseQueryFn<
    unknown,
    unknown,
    unknown
  >,

  endpoints: () => ({}),
  tagTypes: ["links", "profile"],
  refetchOnReconnect: true,
});
