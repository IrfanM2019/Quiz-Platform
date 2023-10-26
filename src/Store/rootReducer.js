import { combineReducers } from "redux";
import UserReducer from "./Slices/UserReducer";
import TestInfo from "./Slices/TestInfo";

const rootReducer = combineReducers({
  users: UserReducer,
  testdetails: TestInfo,
});

export default rootReducer;
