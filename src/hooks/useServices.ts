import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { ADDRESS_BASE_URL, API_KEY } from "../shared/constants";
import { IAddress, IAddressLookupResponse } from "../shared/types";

export const useServices = () => {
  const [postCodeLookupResults, setPostCodeLookupResults] = useState<
    IAddress[]
  >([]);

  const [addressList, setAddressList] = useState<IAddress[]>([]);

  const [loading, setLoading] = useState(false);
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
        `${ADDRESS_BASE_URL}/find/${value}?api-key=${API_KEY}&expand=true&fuzzy=true`
      )
      .then((res) => {
        // let serializedData = addressLookupSerializer(res.data);
        // setPostCodeLookupResults(serializedData);
        setLoading(false);
      })
      .catch((err) => {
        setShowNotification(true);
        setNotificationType("error");
        setNotificationMessage(err.response.data.Message ?? "Error");
        setLoading(false);
      });
  }

  useEffect(() => {
    if (showNotification) {
      let timer = setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage("");
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const addAddressToList = useCallback(
    (address: IAddress) => {
      if (address.country === "") {
        setNotificationMessage("Please select a country");
        setNotificationType("error");
        setShowNotification(true);
        return;
      }
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

  const isAddressOptionEqualtToValue = useCallback(
    (option: IAddress, value: IAddress) => {
      return JSON.stringify(option) === JSON.stringify(value);
    },
    []
  );

  return {
    loading,
    setOpenSearch,
    getAddressByPostcode,
    addAddressToList,
    deleteAdressFromList,
    getAddressOptionLabel,
    isAddressOptionEqualtToValue,
    openSearch,
    addressList,
    postCodeLookupResults,
    showNotification,
    setShowNotification,
    notificationMessage,
    notificationType,
  };
};
