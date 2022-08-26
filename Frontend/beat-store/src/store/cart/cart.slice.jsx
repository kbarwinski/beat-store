import { createSlice } from "@reduxjs/toolkit";

//Slice responsible for
const initialState = {
  cartItems: [],
  totals: 0.0,
};

function addToTotals(totals, payload) {
  totals +=
    payload.licenseType === "lease"
      ? parseFloat(payload.leasePrice)
      : parseFloat(payload.exclusivePrice);
  return Number(totals.toFixed(2));
}

function subtractFromTotals(totals, payload) {
  totals -=
    payload.licenseType === "lease"
      ? parseFloat(payload.leasePrice)
      : parseFloat(payload.exclusivePrice);
  return Number(totals.toFixed(2));
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
      state.totals = addToTotals(state.totals, action.payload);
    },
    removeFromCart(state, action) {
      let itemToDelete = state.cartItems.find((m) => m.id === action.payload);
      state.totals = subtractFromTotals(state.totals, itemToDelete);
      state.cartItems = state.cartItems.filter((m) => m.id !== action.payload);
    },
    switchLicense(state, action) {
      let itemToSwitch = state.cartItems.find((m) => m.id === action.payload);
      state.totals = subtractFromTotals(state.totals, itemToSwitch);

      itemToSwitch.licenseType =
        itemToSwitch.licenseType === "lease" ? "exclusive" : "lease";

      state.totals = addToTotals(state.totals, itemToSwitch);
    },
    emptyCart(state) {
      state.cartItems = [];
      state.totals = 0.0;
    },
  },
});

export const { addToCart, removeFromCart, switchLicense, emptyCart } =
  cartSlice.actions;
export default cartSlice.reducer;
