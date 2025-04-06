import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
store.subscribe(() => {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
    localStorage.setItem("auth", JSON.stringify(store.getState().auth.id));
})