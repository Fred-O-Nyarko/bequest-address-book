import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONTRIES_BASE_URL, CountriesResponse } from "../shared";

export const countriesApi = createApi({
  reducerPath: "api/countries",
  baseQuery: fetchBaseQuery({ baseUrl: CONTRIES_BASE_URL }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: (value: string) => `${CONTRIES_BASE_URL}/${value}`,
      transformResponse: (response: CountriesResponse[]) => {
        return response.map((country) => country.name.common);
      }
    }),
  }),
  
});

export const { useGetCountriesQuery } = countriesApi;
