import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, getReservationSuccess } from "../features/reservationSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
const useReservationRequest = () => {

   const {axiosPublic} = useAxios()
   const dispatch = useDispatch()


   const getReservation = async () => {
      dispatch(fetchStart())
      try {
         const response = await axiosPublic(`/API/v1/reservations`)
         const reservationData = response.data.data
         dispatch(getReservationSuccess({reservationData}))
      } catch (error) {
         dispatch(fetchFail())
      }
   }

   const postReservation = async (info) => {
      dispatch(fetchStart())
      try {
        await axiosPublic.post(`/API/v1/reservations`, info)
        getReservation()
        toastSuccessNotify(`reservations basariliyla eklenmiştir.`)
      } catch (error) {
        dispatch(fetchFail())
        toastErrorNotify(`reservations eklenememiştir.`)
        console.log(error)
      }
    }

   const deleteReservation = async (id) => {
      dispatch(fetchStart())
      try {
         await axiosPublic.delete(`/API/v1/reservations/${id}`)
         getReservation()     
         toastSuccessNotify(`reservations basariliyla silinmiştir.`)    
      } catch (error) {
         dispatch(fetchFail())
         toastErrorNotify(`reservations silinememiştir.`)
         console.log(error)
      }
   }

   return {getReservation, postReservation, deleteReservation}
}
export default useReservationRequest