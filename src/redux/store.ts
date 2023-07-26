import { configureStore } from "@reduxjs/toolkit";

import navbarSlice from "./slice/navbarSlice";
import varianSlice from "./slice/varianSlice";

const store = configureStore({
  reducer: {
    navbarSlice: navbarSlice,
    varianSlice: varianSlice,
  },
});

export default store;
