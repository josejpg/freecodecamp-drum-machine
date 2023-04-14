import { configureStore } from "@reduxjs/toolkit";
import { drumReducer } from "../reducers/drum.reducer";
export const store = configureStore({
    reducer: drumReducer
});