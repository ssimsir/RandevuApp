import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId:"",
  email:"",
  userName: "",
  token: "",
  loading: false,
  error: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false

      state.userId=payload._id
      state.email=payload.email
      state.userName=payload.firstName + " " +payload.lastName
      state.token=payload.token
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
    logoutSuccess: (state) => {
      state.userId=""
      state.email=""
      state.userName= ""
      state.token= ""
      state.loading= false
      state.error= false
    },
  },
})

export const { fetchStart, loginSuccess,fetchFail, logoutSuccess } = authSlice.actions
export default authSlice.reducer
