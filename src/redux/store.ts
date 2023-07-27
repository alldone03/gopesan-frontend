import { configureStore } from "@reduxjs/toolkit";

import navbarSlice from "./slice/navbarSlice";
import varianSlice from "./slice/varianSlice";
import hargaSlice from "./slice/hargaSlice";

const store = configureStore({
  reducer: {
    navbarSlice: navbarSlice,
    varianSlice: varianSlice,
    hargaSlice: hargaSlice,
  },
});

export default store;
