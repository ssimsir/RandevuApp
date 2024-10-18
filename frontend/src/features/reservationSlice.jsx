import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    reservations: [],
    reservationsLoading: false,
    error: false,
};

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.reservationsLoading = true
        },

        getReservationSuccess: (state, { payload:{reservationData} }) => {
            state["reservationsLoading"] = false
            state["reservations"] = reservationData
        },

        fetchFail: (state) => {
            state.loading = false
            state.error = true
        }
    },
});

export const { fetchStart, getReservationSuccess, fetchFail } = reservationSlice.actions;

export default reservationSlice.reducer;
