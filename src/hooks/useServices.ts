import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { BASE_URL, API_KEY } from "../shared/constants";
import { IAddressesResponse, IPostcodeLookupResponse } from "../shared/types";

export const useServices = () => {
  const [apiResponse, setApiResponse] = useState<IPostcodeLookupResponse>(
    {} as IPostcodeLookupResponse
  );

  const [addressList, setAddressList] = useState<Partial<IAddressesResponse>[]>(
    []
  );
  const [options, setOptions] = useState<IAddressesResponse[]>([]);
  const [postCode, setPostCode] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<
    "error" | "success"
  >();

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
        setShowNotification(true);
        setNotificationType("error");
        setNotificationMessage(err.response.data.Message ?? "Error");
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
        setLoading(false);
        setOptions(res.data);
      })
      .catch((err) => {
        setShowNotification(true);
        setNotificationType("error");
        setNotificationMessage(err.response.data.Message ?? "Error");
        setLoading(false);
      });
  }

  useEffect(() => {
    setPostCode("");
    if (showNotification) {
      let timer = setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const addAddressToList = useCallback(
    (address: Partial<IAddressesResponse>) => {
      setAddressList([...addressList, address]);
      setShowNotification(true);
      setNotificationType("success");
      setNotificationMessage("Address added to list!");
    },
    [addressList]
  );

  const deleteAdressFromList = useCallback(
    (address: Partial<IAddressesResponse>) => {
      setAddressList(addressList.filter((item) => item !== address));
      setShowNotification(true);
      setNotificationType("success");
      setNotificationMessage("Address removed from list!");
    },
    [addressList]
  );

  const getAddressOptionLabel = useCallback(
    (option: IAddressesResponse) => {
      const { line_1, line_2, line_3, town_or_city, country } = option;
      return [line_1, line_2, line_3, postCode, town_or_city, country]
        .filter(Boolean)
        .join(", ");
    },
    [postCode]
  );

  const getCountryOptionLabel = useCallback((option: any) => option, []);

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
    showNotification,
    setShowNotification,
    notificationMessage,
    notificationType,
  };
};
