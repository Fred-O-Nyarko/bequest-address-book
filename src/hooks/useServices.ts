import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { BASE_URL, API_KEY } from "../shared/constants";
import { IAddressesResponse, IPostcodeLookupResponse } from "../shared/types";

export const useServices = () => {
  const [apiResponse, setApiResponse] = useState<IPostcodeLookupResponse>(
    {} as IPostcodeLookupResponse
  );

  const [addressList, setAddressList] = useState<IAddressesResponse[]>([]);
  const [options, setOptions] = useState<IAddressesResponse[]>([]);
  const [postCode, setPostCode] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const { addresses } = apiResponse ?? {};

  useEffect(() => {
    if (!openSearch) {
      setApiResponse({} as IPostcodeLookupResponse);
    }
  }, [openSearch, setOptions]);

  function getAddressByPostcode(value: string) {
    setLoading(true);
    axios
      .get<IPostcodeLookupResponse>(
        `${BASE_URL}/find/${value}?api-key=${API_KEY}&expand=true&fuzzy=true`
      )
      .then((res) => {
        setApiResponse(res.data);
        setPostCode(res.data.postcode);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function getCountries(value: string) {
    setLoading(true);
    axios
      .post(`${BASE_URL}/typeahead/${value}?api-key=${API_KEY}`, {
        search: ["country"],
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const addAddressToList = useCallback(
    (address: IAddressesResponse) => {
      setAddressList([...addressList, address]);
    },
    [addressList]
  );

  const deleteAdressFromList = useCallback(
    (address: IAddressesResponse) => {
      setAddressList(addressList.filter((item) => item !== address));
    },
    [addressList]
  );

  const getAddressOptionLabel = useCallback(
    (option: IAddressesResponse) =>
      option.formatted_address.filter(Boolean).join(", "),
    []
  );

  const getCountryOptionLabel = useCallback(
    (option: any) => option,
    []
  );

  const isAddressOptionEqualtToValue = useCallback(
    (option: IAddressesResponse, value: IAddressesResponse) => {
      return option.formatted_address === value.formatted_address;
    },
    []
  );

  const isCountryOptionEqualtToValue = useCallback(
    (option: IAddressesResponse, value: IAddressesResponse) => {
      return option.country === value.country;
    },
    []
  );

  return {
    options,
    postCode,
    loading,
    openModal,
    setOpenModal,
    setOpenSearch,
    addresses,
    getAddressByPostcode,
    getCountries,
    addAddressToList,
    deleteAdressFromList,
    getAddressOptionLabel,
    getCountryOptionLabel,
    isAddressOptionEqualtToValue,
    isCountryOptionEqualtToValue,
    openSearch,
    addressList,
  };
};
