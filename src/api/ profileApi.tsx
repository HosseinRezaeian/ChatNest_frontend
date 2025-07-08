import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = import.meta.env.VITE_SERVER_ADDRESS;

export const ProfileApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    profile: builder.mutation({
      query: () => ({
        url: 'user/profile/',
        method: 'POST',
 
      }),
    }),
  }),
});

export const { useProfileMutation:useProfile } = ProfileApi;
