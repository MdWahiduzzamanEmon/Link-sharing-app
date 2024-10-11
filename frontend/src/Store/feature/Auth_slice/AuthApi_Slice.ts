import {apiSlice} from '../../api/apiSlice';

export const authApi_Slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (loginData: any) => ({
        url: '/login/',
        method: 'POST',
        body: loginData,
      }),
    }),
    getCurrentUser: builder.query({
      query: (params: any) => ({
        url: '/current-user/',
        method: 'GET',
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ['currentUser'],
    }),

    getUserInformationImage: builder.query({
      query: () => ({
        url: '/user_information_image/',
        method: 'GET',
      }),

      providesTags: ['userInformationImage'],
    }),

    getInvestorFinancialData: builder.query({
      query: ({userId}: any) => ({
        url: `api/get_financial_data/${userId}/`,
        method: 'GET',
      }),
    }),

    register: builder.mutation({
      query: (body: any) => ({
        url: '/register/',
        method: 'POST',
        body,
      }),
    }),

    verifyOTP: builder.mutation({
      query: (body: any) => ({
        url: 'api/verify_email_token/',
        method: 'POST',
        body,
      }),
    }),

    // check_unique_email
    checkUniqueEmail: builder.query({
      query: (email: any) => ({
        url: '/check_unique_email/',
        method: 'GET',
        params: {
          email,
        },
      }),
    }),

    // check_unique_username
    checkUniqueUsername: builder.query({
      query: (username: any) => ({
        url: '/check_unique_username/',
        method: 'GET',
        params: {
          username,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOTPMutation,

  //for user
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,

  //for image
  useGetUserInformationImageQuery,
  useLazyGetUserInformationImageQuery,

  //for financial
  useGetInvestorFinancialDataQuery,
  useLazyGetInvestorFinancialDataQuery,

  //for check unique email
  useCheckUniqueEmailQuery,
  useLazyCheckUniqueEmailQuery,

  //for check unique username
  useCheckUniqueUsernameQuery,
  useLazyCheckUniqueUsernameQuery,
} = authApi_Slice;
