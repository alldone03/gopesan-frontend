import { createSlice } from "@reduxjs/toolkit";

const hargaSlice = createSlice({
  name: "harga",
  initialState: {
    isAddModalOpen: false as boolean,
    isLoading: true as boolean,
    isRefresh: true as boolean,
    IdHarga: 0 as number,
    ListHarga: [] as any,
  },
  reducers: {
    toggleAddModalShow: (state: { isAddModalOpen: boolean }) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    changeIdHarga: (
      state: { IdHarga: number },
      action: { payload: number }
    ) => {
      state.IdHarga = action.payload;
    },
  },
});

export const { toggleAddModalShow, changeIdHarga } = hargaSlice.actions;
export default hargaSlice.reducer;
