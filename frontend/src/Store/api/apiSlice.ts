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
  // credentials: "include",
  prepareHeaders: async (headers, { getState }: any) => {
    // const token = getState()?.authSlice?.loginUserData?.access_token;
    // REFRESH_TOKEN = getState()?.authSlice?.loginUserData?.refresh_token;
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }

    return headers;
  },
  credentials: "include", // include, same-origin, omit
});

const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  // const dispatch = api.dispatch;
  // console.log(api);
  // console.log('result', result?.meta?.response?.status);
  if (result?.meta?.response?.status === 401) {
    // api.dispatch(logOut());
  } else {
    return result;
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry as unknown as BaseQueryFn<unknown, unknown, {}>,

  endpoints: () => ({}),
  tagTypes: ["links", "profile"],
  refetchOnReconnect: true,
}) as any;
