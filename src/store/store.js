import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import categoriesSlice from "./slices/categoriesSlice";
import pageSlice from "./slices/pageSlice";

export const store = configureStore({
    reducer:{
        products:productsSlice,
        categories:categoriesSlice,
        pageActions:pageSlice
    }
})