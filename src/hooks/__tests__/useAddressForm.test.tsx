import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "src/redux";
import { useAddressForm } from "..";

describe("useAddressForm hook", () => {
  it("should be defined", () => {
    expect(useAddressForm).toBeDefined();
  });

  it("should return an object", () => {
    const { result } = renderHook(() => useAddressForm(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current).toBeInstanceOf(Object);
  });
});
