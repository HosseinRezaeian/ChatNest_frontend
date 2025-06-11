// src/api/api.ts
import { createApi, fetchBaseQuery, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8000/api/';

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const access = localStorage.getItem('access');
    if (access) {
      headers.set('Authorization', `Bearer ${access}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('Access token expired, trying to refresh...');
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      const refreshResult = await baseQuery({
        url: 'token/refresh/',  
        method: 'POST',
        body: { refresh },
      }, api, extraOptions);

      interface RefreshResponse {
        access: string;
      }
      
      if (refreshResult.data) {
        const refreshData = refreshResult.data as RefreshResponse;
        const newAccess = refreshData.access;
        localStorage.setItem('access', newAccess);
        const retryResult = await baseQuery(args, api, extraOptions);
        return retryResult;
      } else {
        console.log('Refresh token failed');
      }
    } else {
      console.log('No refresh token found');
    }
  }

  return result;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth'],
  endpoints: () => ({}),
});
