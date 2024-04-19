import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducers";
import {middleware} from "../utils/Middleware";

const middlewares = [thunkMiddleware,middleware];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers)

const store = createStore(
    rootReducer,
    composedEnhancers
);

export default store;
