import { TModalID } from './../shared/types';
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { addressLookupSerializer } from "../serializers/addressLookup";
import { BASE_URL, API_KEY } from "../shared/constants";
import { IAddress, IAddressLookupResponse } from "../shared/types";

export const useServices = () => {
  const [postCodeLookupResults, setPostCodeLookupResults] = useState<
    IAddress[]
  >([]);

  const [addressList, setAddressList] = useState<IAddress[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [addressDetail, setAddressDetail] = useState<IAddress | null>(null);

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState<TModalID>(null);
  const [openSearch, setOpenSearch] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<
    "error" | "success"
  >();

  function getAddressByPostcode(value: string) {
    setLoading(true);
    axios
      .get<IAddressLookupResponse>(
        `${BASE_URL}/find/${value}?api-key=${API_KEY}&expand=true&fuzzy=true`
      )
      .then((res) => {
        let serializedData = addressLookupSerializer(res.data);
        setPostCodeLookupResults(serializedData);
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
        setCountries(res.data);
      })
      .catch((err) => {
        setShowNotification(true);
        setNotificationType("error");
        setNotificationMessage(err.response.data.Message ?? "Error");
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!openSearch) {
      setPostCodeLookupResults([]);
    }
  }, [openSearch, setCountries]);

  useEffect(() => {
    if (showNotification) {
      let timer = setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const addAddressToList = useCallback(
    (address: IAddress) => {
      setAddressList([...addressList, address]);
      setShowNotification(true);
      setNotificationType("success");
      setNotificationMessage("Address added to list!");
    },
    [addressList]
  );

  const deleteAdressFromList = useCallback(
    (address: IAddress) => {
      setAddressList(addressList.filter((item) => item !== address));
      setShowNotification(true);
      setNotificationType("success");
      setNotificationMessage("Address removed from list!");
    },
    [addressList]
  );

  const getAddressOptionLabel = useCallback((option: IAddress) => {
    return Object.values(option).filter(Boolean).join(", ");
  }, []);

  const getCountryOptionLabel = useCallback((option: string) => option, []);

  const isAddressOptionEqualtToValue = useCallback(
    (option: IAddress, value: IAddress) => {
      return JSON.stringify(option) === JSON.stringify(value);
    },
    []
  );

  const isCountryOptionEqualtToValue = useCallback(
    (option: string, value: string) => {
      return option === value;
    },
    []
  );

  return {
    countries,
    loading,
    openModal,
    setOpenModal,
    setOpenSearch,
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
    postCodeLookupResults,
    showNotification,
    setShowNotification,
    notificationMessage,
    notificationType,
    addressDetail,
    setAddressDetail,
  };
};
