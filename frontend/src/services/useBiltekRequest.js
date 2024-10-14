import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, getBiltekSuccess } from "../features/biltekSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
const useBiltekRequest = () => {

   const {axiosPublic} = useAxios()
   const dispatch = useDispatch()


   const getBiltek = async (path) => {
      dispatch(fetchStart({path}))
      try {
         const response = await axiosPublic(`/API/v1/${path}`)
         const biltekData = response.data.data
         dispatch(getBiltekSuccess({path, biltekData}))
      } catch (error) {
         dispatch(fetchFail({path}))
      }
   }

   const postBiltek = async (path, info) => {
      dispatch(fetchStart({path}))
      try {
        await axiosPublic.post(`/API/v1/${path}`, info)
        getBiltek(path)
        toastSuccessNotify(`${path} basariliyla eklenmiştir.`)
      } catch (error) {
        dispatch(fetchFail({path}))
        toastErrorNotify(`${path} eklenememiştir.`)
        console.log(error)
      }
    }



   const deleteBiltek = async (path, id) => {
      dispatch(fetchStart({path}))
      try {
         await axiosPublic.delete(`/API/v1/${path}/${id}`)
         getBiltek(path)     
         toastSuccessNotify(`${path} basariliyla silinmiştir.`)    
      } catch (error) {
         dispatch(fetchFail({path}))
         toastErrorNotify(`${path} silinememiştir.`)
         console.log(error)
      }
   }

   return {getBiltek,postBiltek, deleteBiltek}
}
export default useBiltekRequest