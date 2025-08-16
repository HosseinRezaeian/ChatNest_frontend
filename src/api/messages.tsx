
import { IMessage } from '@/models/Message';
import { api } from './api';



export const MessageApi = api.injectEndpoints({

  endpoints: (builder) => ({

    getListMessages: builder.query<IMessage[], {room_id:string}>({
      query: ({room_id}) => ({
        url: 'messages/',
        method: 'GET',
        params:{room_id}

      }),
      providesTags: () => [{ type: 'Message', id: 'LIST' }],
    }),

  }),
});

export const { 
useGetListMessagesQuery:useGetListMessages


} = MessageApi;
