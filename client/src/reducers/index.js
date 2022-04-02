import channelReducer from "./channel";
import usernameReducer from "./username";
import isValidReducer from "./isValid";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    username: usernameReducer,
    channel: channelReducer,
    isValid: isValidReducer
})

export default allReducers;