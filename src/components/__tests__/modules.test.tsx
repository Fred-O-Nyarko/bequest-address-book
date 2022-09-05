/* eslint-disable testing-library/prefer-screen-queries */
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setModal, store } from "src/redux";
import AddressDetail from "../modules/address/AddressDetail";

describe("components test for modules", () => {
  afterEach(cleanup);
  it("renders AddressDetail component", () => {
    store.dispatch(setModal("detail-form"));

    const { getByText, container } = render(
      <Provider store={store}>
        <AddressDetail />
      </Provider>
    );

    expect(getByText(/Address Detail/)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
