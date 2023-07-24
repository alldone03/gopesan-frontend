import { configureStore } from "@reduxjs/toolkit";

import navbarSlice from "./slice/navbarSlice";

const store = configureStore({
  reducer: {
    navbarSlice: navbarSlice,
  },
});

export default store;
