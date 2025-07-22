import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from './api';
import { IPrivateRoom } from '@/models/PrivateRoomModel';


export const RoomApi = api.injectEndpoints({

  endpoints: (builder) => ({

    getListPrivateRooms: builder.query<IPrivateRoom[], void>({
      query: () => ({
        url: 'private_rooms/',
        method: 'GET'

      }),
      providesTags: () => [{ type: 'PrivateRoom', id: 'LIST' }],
    }),

    // searchContacts: builder.mutation<{ id: string }, { search: string }>({
    //   query: ({ search }) => ({
    //     url: 'contacts/add_contact/',
    //     method: 'POST',
    //     params: { search },

    //   }),
    //   invalidatesTags: [{ type: 'Contacts', id: 'LIST' }]
    // })

  }),
});

export const { 
  useGetListPrivateRoomsQuery:useGetListPrivateRooms

} = RoomApi;
