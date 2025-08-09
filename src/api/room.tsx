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

    GetOrMakePrivetRoom: builder.mutation<IPrivateRoom, { email: string }>({
      query: ({ email }) => ({
        url: 'private_rooms/create-or-get/',
        method: 'POST',
        body: { "email":email },
      }),
      invalidatesTags: [{ type: 'PrivateRoom', id: 'LIST' }]
    })

  }),
});

export const { 
  useGetListPrivateRoomsQuery:useGetListPrivateRooms,
  useGetOrMakePrivetRoomMutation:useGetOrMakePrivetRoom


} = RoomApi;
