import { api } from './api';


export const TockenSocket = api.injectEndpoints({

  endpoints: (builder) => ({

    getTocken: builder.query<{token:string},void>({
      query: () => ({
        url: 'socket/token/',
        method: 'POST',
      }),

    })

  }),
});

export const { 
useGetTockenQuery:GetTocken


} = TockenSocket;
