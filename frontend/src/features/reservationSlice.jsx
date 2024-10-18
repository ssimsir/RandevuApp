import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    reservations: [],
    reservationPatientlists : [],
    loading : false,
    error: false,
};

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },

        getReservationSuccess: (state, { payload:{reservationData} }) => {
            state["loading"] = false
            state["reservations"] = reservationData
        },

        getReservationPatientlistsSuccess:(state, { payload:{reservationPatientlistsData} }) => {
            state["loading"] = false
            state["reservationPatientlists"] = reservationPatientlistsData
        },

        fetchFail: (state) => {
            state.loading = false
            state.error = true
        }
    },
});

export const { fetchStart, getReservationSuccess, getReservationPatientlistsSuccess, fetchFail } = reservationSlice.actions;

export default reservationSlice.reducer;
