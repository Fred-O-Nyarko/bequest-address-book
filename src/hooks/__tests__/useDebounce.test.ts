import { renderHook } from "@testing-library/react";
import { useDebounce } from "./../useDebounce";

describe("useDebounce hook", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(useDebounce).toBeDefined();
  });

  it("should return a string value", () => {
    const testInput = "testing";
    const { result } = renderHook(() => useDebounce("testing", 200));
    expect(typeof result.current).toBe("string");
    expect(result.current.length).toBe(testInput.length);
  });
});
