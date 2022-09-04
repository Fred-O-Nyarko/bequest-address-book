import { renderHook, RenderHookResult } from "@testing-library/react";
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

  function getHook(
    ms: number = 5,
    dep: string = ""
  ): [jest.Mock, RenderHookResult<string, { delay: number; deps: string }>] {
    const spy = jest.fn();
    return [
      spy,
      renderHook(
        ({ delay = 5, deps = "testing" }) => useDebounce(deps, delay),
        {
          initialProps: {
            deps: dep,
            delay: ms,
          },
        }
      ),
    ];
  }

  it("should call passed function after given amount of time", () => {
    const [spy] = getHook();

    expect(spy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(5);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
