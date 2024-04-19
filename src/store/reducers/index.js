// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import commonReducer from "./commonReducer";
import financeReducer from "./fainanceReducer";
import gameReducer from "./gameReducer";
import commonLoaderReducer from "./commonLoaderReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    common: commonReducer,
    commonLoader: commonLoaderReducer,
    finance: financeReducer,
    game: gameReducer,
    // Add other reducers here
});

export default rootReducer;
