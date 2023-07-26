import { createSlice } from "@reduxjs/toolkit";

const varianSlice = createSlice({
  name: "varian",
  initialState: {
    isAddModalOpen: false as boolean,
    isLoading: true as boolean,
    isRefresh: true as boolean,
    namaMenu: [] as any,
    dataVarian: [] as any,
    idUpdate: 0 as number,
    isRefreshModal: false as boolean,
  },
  reducers: {
    toggleAddModalShow: (state: { isAddModalOpen: boolean }) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    addNamaMenu: (state: { namaMenu: any }, action: { payload: any }) => {
      state.namaMenu = action.payload;
    },
    addDataVarian: (state: { dataVarian: any }, action: { payload: any }) => {
      state.dataVarian = action.payload;
    },
    changeIsLoading: (
      state: { isLoading: boolean },
      action: { payload: any }
    ) => {
      state.isLoading = action.payload;
    },
    changeIsRefresh: (state: { isRefresh: boolean }) => {
      state.isRefresh = !state.isRefresh;
    },
    changeId: (state: { idUpdate: number }, action: { payload: number }) => {
      state.idUpdate = action.payload;
    },
    changeIsRefreshModal: (state: { isRefreshModal: boolean }) => {
      state.isRefreshModal = !state.isRefreshModal;
    },
  },
});

export const {
  toggleAddModalShow,
  addNamaMenu,
  addDataVarian,
  changeIsLoading,
  changeIsRefresh,
  changeId,
  changeIsRefreshModal,
} = varianSlice.actions;
export default varianSlice.reducer;
