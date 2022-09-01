export interface IAddress {
  lineOne: string;
  lineTwo?: string;
  lineThree?: string;
  postCode: string;
  country: string;
  town: string;
  id: string;
}

export interface IAddressLookupResponse {
  postcode: string;
  latitude: number;
  longitude: number;
  addresses: IAddressesResponse[];
}

export interface IAddressesResponse {
  formatted_address: string[];
  thoroughfare: string;
  building_name: string;
  sub_building_name: string;
  sub_building_number: string;
  building_number: string;
  line_1: string;
  line_2: string;
  line_3: string;
  line_4: string;
  locality: string;
  town_or_city: string;
  county: string;
  district: string;
  country: string;
}

export type TModalID = "mutate-form" | "detail-form" | null;

export type CountriesResponse = {
  name: {
    common: string;
  };
};
