import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxios = () => {

   const {token} = useSelector((state) => state.auth)
   
   const axiosToken = axios.create({
      baseURL: '',
      headers: {Authorization :  `Token ${token}`},
    });  
    
    const axiosPublic = axios.create({
      baseURL: '',
    });  

  return {axiosToken, axiosPublic }
}

export default useAxios
