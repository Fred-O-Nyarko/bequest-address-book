import { SearchBox } from "src/components/";

const PostcodeSearchBox = () => {
    
  return (
    <SearchBox
      options={postCodeLookupResults}
      loading={loading}
      searchFxn={getAddressByPostcode}
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
