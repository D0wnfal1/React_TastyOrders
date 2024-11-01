import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice.ts";
import menuItemApi from "../../Apis/menuItemApi.ts";
const store = configureStore({
    reducer:{
        menuItemStore: menuItemReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(menuItemApi.middleware),
});

export type RootState = ReturnType<typeof  store.getState>;

export default store;