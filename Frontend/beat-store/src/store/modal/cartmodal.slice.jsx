import { createSlice } from "@reduxjs/toolkit";

//Slice responsible for global modals state handling
const initialState = {
  isCrudOpen: false,
  isCartOpen: false,
  isStripeOpen: false,
  modalItem: {},
};

const cartModalSlice = createSlice({
  name: "cartModal",
  initialState,
  reducers: {
    toggleCartOpen(state, action) {
      state.isCartOpen = true;
      state.modalItem = { ...action.payload };
    },
    toggleCartClose(state) {
      state.isCartOpen = false;
      state.modalItem = {};
    },
    toggleCrudOpen(state, action) {
      state.isCrudOpen = true;
      state.modalItem = { ...action.payload };
    },
    toggleCrudClose(state) {
      state.isCrudOpen = false;
      state.modalItem = {};
    },
    toggleStripeOpen(state, action) {
      state.isStripeOpen = true;
      state.modalItem = { ...action.payload };
    },
    toggleStripeClose(state) {
      state.isStripeOpen = false;
      state.modalItem = {};
    },
  },
});

export const {
  toggleCartOpen,
  toggleCartClose,
  toggleCrudOpen,
  toggleCrudClose,
  toggleStripeOpen,
  toggleStripeClose,
} = cartModalSlice.actions;
export default cartModalSlice.reducer;
