import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from './api';
import { Icontact } from '@/models/contactModel';


export const ContactsApi = api.injectEndpoints({

  endpoints: (builder) => ({
    getListContacts: builder.query<Icontact[], void>({
      query: () => ({
        url: 'contacts/get_contact/',
        method: 'GET',

      }),
    }),

    searchContacts: builder.mutation<{ id: string }, { search: string }>({
      query: ({search}) => ({
        url: 'contacts/add_contact/',
        method: 'POST',
        params: { search }
      })

    })
  }),
});

export const { useGetListContactsQuery: useGetListContacts, 
  useSearchContactsMutation:useSearchContacts } = ContactsApi;
