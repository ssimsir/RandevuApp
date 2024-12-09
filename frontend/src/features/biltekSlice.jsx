import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	patients: [],
   patientsLoading:false,
	products: [],
   productsLoding:false,
	reservations: [],
   reservationsLoading:false,
	loading: false,
	error: false,
};

const biltekSlice = createSlice({
	name: "biltek",
	initialState,
	reducers: {
      fetchStart : (state, {payload:{path}}) => {
         state[`${path}Loading`] = true
      },

      getBiltekSuccess: (state, {payload:{path, biltekData}}) => {
         state[`${path}Loading`] = false
         state[`${path}`] = biltekData
      },

      fetchFail : (state) => {
         state.loading = false
         state.error = true
      }
   },
});

export const {fetchStart, getBiltekSuccess, fetchFail } = biltekSlice.actions;

export default biltekSlice.reducer;
