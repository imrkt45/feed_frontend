import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export interface Feed {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedResponse {
  feeds: Feed[];
  totalCount: number;
}

export const feedApi = createApi({
  reducerPath: "feedApi",

  baseQuery: fetchBaseQuery({
    baseUrl:
      "http://localhost:5001",
  }),

  tagTypes: ["Feeds"],

  endpoints: (builder) => ({
    // GET FEEDS
    getFeeds: builder.query<
      FeedResponse,
      {
        page: number;
        limit: number;
      }
    >({
      query: ({
        page,
        limit,
      }) =>
        `/feed?page=${page}&limit=${limit}`,

      providesTags: ["Feeds"],
    }),

    // CREATE FEED
    createFeed:
      builder.mutation<
        Feed,
        {
          title: string;
          description: string;
        }
      >({
        query: (body) => ({
          url: "/feed",

          method: "POST",

          body,
        }),

        invalidatesTags: [
          "Feeds",
        ],
      }),
  }),
});

export const {
  useGetFeedsQuery,
  useCreateFeedMutation,
} = feedApi;