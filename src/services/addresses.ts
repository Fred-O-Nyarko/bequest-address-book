import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ADDRESS_BASE_URL, API_KEY, IAddressLookupResponse } from "src/shared";

export const addressApi = createApi({
  reducerPath: "api/addresses",
  tagTypes: ["Address"],
  baseQuery: fetchBaseQuery({ baseUrl: ADDRESS_BASE_URL }),
  endpoints: (builder) => ({
    getAddressByPostcode: builder.query({
      query: (value: string) => `${ADDRESS_BASE_URL}/find/${value}?api-key=${API_KEY}&expand=true&fuzzy=true`,
      providesTags: ["Address"],
      // transform response works here as a serializer
      transformResponse: (response: IAddressLookupResponse) => {
        return response.addresses.map((address, index) => ({
          postCode: response.postcode,
          lineOne: address.line_1,
          lineTwo: address.line_2,
          lineThree: address.line_3,
          town: address.town_or_city,
          country: address.country,
          // manually construct an id for each address
          id: address.line_1 + index,
        }));
      },
    }),
  }),
});

export const { useGetAddressByPostcodeQuery } = addressApi;
