import { useDebounce } from "src/hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";
import {
  addAddress,
  setNotification,
  useAppDispatch,
  useGetAddressByPostcodeQuery,
} from "src/redux";
import { DEBOUNCE_RATE, IAddress } from "src/shared";
import { SearchBox } from "src/components";

const PostcodeSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useAppDispatch();
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_RATE);
  const {
    data: postCodeLookupResults,
    isLoading: loading,
    error,
    isError,
  } = useGetAddressByPostcodeQuery(debouncedSearchQuery, {
    skip: debouncedSearchQuery === "",
  });

  useEffect(() => {
    if (isError) {
      dispatch(
        setNotification({
          //  @ts-ignore
          // TODO: fix this type error
          message: error?.data.Message || "Something went wrong",
          type: "error",
        })
      );
    }
  }, [dispatch, error, isError]);
  const addAddressToList = useCallback(
    (address: IAddress) => {
      dispatch(addAddress(address));
      dispatch(
        setNotification({
          message: "Address added successfully",
          type: "success",
        })
      );
    },
    [dispatch]
  );

  const isAddressOptionEqualtToValue = useCallback(
    (option: IAddress, value: IAddress) => {
      return JSON.stringify(option) === JSON.stringify(value);
    },
    []
  );

  const getAddressOptionLabel = useCallback((option: IAddress) => {
    return Object.values(option).filter(Boolean).join(", ");
  }, []);

  return (
    <SearchBox
      options={postCodeLookupResults ?? []}
      loading={loading}
      searchFxn={setSearchQuery}
      label={loading ? "Loading..." : "Search address with postcode"}
      changeFxn={addAddressToList}
      open={openSearch}
      setOpen={setOpenSearch}
      getOptionLabel={getAddressOptionLabel}
      isOptionEqualToValue={isAddressOptionEqualtToValue}
    />
  );
};

export default PostcodeSearchBox;
