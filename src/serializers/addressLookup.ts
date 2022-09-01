import { IAddress, IAddressLookupResponse } from "../shared/types";

export const addressLookupSerializer = (
  response: IAddressLookupResponse
): IAddress[] => {

 return response.addresses.map((address) => ({
      postCode: response.postcode,
      lineOne: address.line_1,
      lineTwo: address.line_2,
      lineThree: address.line_3,
      town: address.town_or_city,
      country: address.country,
      id: address.line_1,
    }))
  
};
