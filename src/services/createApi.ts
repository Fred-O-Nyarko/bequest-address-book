// Import the RTK Query methods from the React-specific entry point
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { API_KEY, CONTRIES_BASE_URL } from "../shared";

// // Define our single API slice object
// export const apiSlice = createApi({
//   // The cache reducer expects to be added at `state.api` (already default - this is optional)
//   reducerPath: "api",
//   // All of our requests will have URLs starting with the BASE_URL
//   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
//   // The "endpoints" represent operations and requests for this server
//   endpoints: (builder) => ({
//     // The `getPosts` endpoint is a "query" operation that returns data
//     getCountries: builder.query({
//       // The URL for the request is 'BASE_URL/typeahead/:value?api-key=API_KEY'
//       query: (value: string) =>  `${BASE_URL}/typeahead/${value}?api-key=${API_KEY}`,
//     }),

//     getAddressByPostcode: builder.query({
//       // The URL for the request is 'BASE_URL/find/:value?api-key=API_KEY&expand=true&fuzzy=true'
//       query: (value: string) =>
//         `/find/${value}?api-key=${API_KEY}&expand=true&fuzzy=true`,
//     }),
//   }),
// });

// // Export the auto-generated hook for the `getCountries` and `getAddressByPostcode` query endpoints
// export const { useGetCountriesMutation, useGetAddressByPostcodeQuery } = apiSlice;

export {}