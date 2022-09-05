/* eslint-disable testing-library/prefer-screen-queries */
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { EmptyState, FloatingActionButton } from "src/components";
import { store } from "src/redux";

describe("components test for elements", () => {
  afterEach(cleanup);
  it("renders EmptyState component with empty state message", () => {
    const { getByTestId, container } = render(<EmptyState message="Testing" />);

    expect(getByTestId("empty-message")).toHaveTextContent("Testing");
    expect(container).toMatchSnapshot();
  });

  it("renders FloatingActionButton", () => {
    const { container } = render(
      <Provider store={store}>
        <FloatingActionButton />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
