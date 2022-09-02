import { setNotification } from "..";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

/**
 * Log a warning and show an error toast!
 */
const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!");
      api.dispatch(
        setNotification({
          message: action.error.message,
          type: "error",
        })
      );
    }
    return next(action);
  };

export default rtkQueryErrorLogger;
