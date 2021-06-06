import { createStore, combineReducers } from "redux";
import { foodReducer } from "./reducers/foodReducer";
import { userReducer } from "./reducers/userReducer";

import { composeWithDevTools } from 'redux-devtools-extension';


const combineReducer = combineReducers({
    foods: foodReducer,
    user: userReducer,
})
export const store = createStore(combineReducer, composeWithDevTools());