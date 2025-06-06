// src/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8000/api/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const access = localStorage.getItem('access');
      const refresh = localStorage.getItem('refresh');
      if (access) {
        headers.set('Authorization', `Bearer ${access}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Auth'],
  endpoints: () => ({}),
});
