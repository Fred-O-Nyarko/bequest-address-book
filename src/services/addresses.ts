import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ADDRESS_BASE_URL } from "../shared";

export const addressApi = createApi({
  reducerPath: "api/addresses",
  baseQuery: fetchBaseQuery({ baseUrl: ADDRESS_BASE_URL }),
  endpoints: (builder) => ({
    getAddressByPostcode: builder.query({
      query: (value: string) => `${ADDRESS_BASE_URL}/${value}`,
    }),
  }),
});

export const { useGetAddressByPostcodeQuery } = addressApi;
