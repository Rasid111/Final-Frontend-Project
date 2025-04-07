import { createSlice } from '@reduxjs/toolkit';
import { CgFontSpacing } from 'react-icons/cg';

const cart = localStorage.getItem("cart");
let initialState = [];

if (cart === null)
  localStorage.setItem("cart", JSON.stringify(initialState));
else
  initialState = JSON.parse(cart);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload;

      const existingProduct = state.find(product => product.id === id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.push({ id, quantity });
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      return state.filter(product => product.id !== id);
    },

    decrementProduuctQuantity: (state, action) => {
      const id = action.payload;
      const mappedState = state.map(product => {
        if (product.id === id)
          return {
            ...product,
            quantity: product.quantity - 1
          }
        return product;
      });
      return mappedState.filter(product => product.quantity > 0);
    },
    incrementProduuctQuantity: (state, action) => {
      const id = action.payload;
      return state.map(product => {
        if (product.id === id)
          return {
            ...product,
            quantity: parseInt(product.quantity) + 1
          }
          return product;
      });
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.find(product => product.id === id);

      if (product) {
        if (quantity <= 0) {
          state = state.filter(product => product.id !== id);
        } else {
          product.quantity = quantity;
        }
      }
    },

    clearCart: (state) => {
      return [];
    },

    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decrementProduuctQuantity,
  incrementProduuctQuantity,
  updateQuantity,
  clearCart,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;