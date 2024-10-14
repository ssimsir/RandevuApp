import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { fetchFail, fetchStart, loginSuccess , logoutSuccess} from "../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useAxios from "./useAxios"

const useAuthRequest = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {token} = useSelector((state) => state.auth)

   const {axiosPublic} = useAxios()

   const BASE_URL = "/API/v1"

   const login = async (userData) => {
      dispatch(fetchStart())
      try {
         const { data } = await axiosPublic.post(BASE_URL+"/auth/login",userData)         
         console.log(data.user)

         dispatch(loginSuccess(data.user))
         toastSuccessNotify("Login işlemi başarılı")
         navigate("/app/biltek")
      } catch (error) {
         dispatch(fetchFail())
         toastErrorNotify(`Login başarısız oldu ${error.message}`)
         console.log(error)
      }
   }

   const register = async (registerData) => {
      dispatch(fetchStart())
      try {
         //const { data } = await axiosPublic.post("/auth/signup",registerData)
         const { data } = await axiosPublic.post(BASE_URL+"/users",registerData)
         console.log(data)
         dispatch(loginSuccess(data))
         toastSuccessNotify("Register işlemi başarılı")
         navigate("/")
      } catch (error) {
         dispatch(fetchFail())
         toastErrorNotify(`Register başarısız oldu \n ${error.message}`)
         console.log(error)
      }

    }
   const logout = async () => {
      dispatch(fetchStart())
      try {
         await axiosPublic.post(BASE_URL+"/auth/refresh", {"token":token})  //kontrol edilecek
         //await axiosPublic.post("/auth/refresh", {"token":token})
         dispatch(logoutSuccess())
      } catch (error) {
         dispatch(fetchFail)
      }

   }

   return { login, register, logout }
}

export default useAuthRequest
