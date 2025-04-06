import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    id: null
};
const auth = localStorage.getItem("auth");

if (auth === null)
    localStorage.setItem("auth", JSON.stringify(initialState.id));
else
    initialState.id = JSON.parse(auth);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const { id } = action.payload;
      state.id = id;
    },
    logout: (state) => {
      state.id = null;
    },
}});

export const { 
  login,
  logout
} = authSlice.actions;

export default authSlice.reducer;