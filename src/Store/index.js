import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import UserReducer from "./Slices/UserReducer";
// import TestInfo from "./Slices/TestInfo";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer ,
  middleware: (getDefaultMiddleware) => middleware,
});

export default store;
