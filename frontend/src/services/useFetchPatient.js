import { useState } from 'react';
import useAxios from './useAxios';
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
const useFetchPatient = () => {
    const { axiosToken } = useAxios();

    // State'leri tanımlıyoruz
    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Ürün grubunu getiren fonksiyon
    const fetchPatient = async ({name, idNumber}) => {
        setLoading(true);
        setError(null); // Önceki hatayı sıfırlıyoruz
        let searchParams = ""
        if (idNumber) {
            searchParams = `/?filter[idNumber]=${idNumber}`
        } else if (name) {
            searchParams = `/?search[name]=${name}`
        }

        try {
            const { data } = await axiosToken(`/API/v1/patients${searchParams}`);
            setPatients(data.data); // Gelen verileri state'e kaydediyoruz
        } catch (error) {
            setError('Hata oluşru.');
            console.error(error);
        } finally {
            setLoading(false); // Yükleme durumu bitiyor
        }
    };


    const saveProduct = async (product) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosToken.post('/API/v1/products', product);
            toastSuccessNotify(`${data.data.group} ${data.data.type} Eklenmiştir`)

        } catch (error) {
            toastErrorNotify("Hata Oluştu")
        }finally {
            setLoading(false); // Yükleme durumu bitiyor
        }
    }

    const updateProduct = async (product, id) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosToken.put(`/API/v1/products/${id}`, product);
            toastSuccessNotify(`${data.new.group} ${data.new.type} Güncellenmiştir`)
           

        } catch (error) {
            toastErrorNotify("Hata Oluştu")
        }finally {
            setLoading(false); // Yükleme durumu bitiyor
        }
    }

    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axiosToken.delete(`/API/v1/products/${id}`);
            toastSuccessNotify(`Ürün Silinmiştir`)
           

        } catch (error) {
            toastErrorNotify("Hata Oluştu")
        }finally {
            setLoading(false); // Yükleme durumu bitiyor
        }
    }

    // Hook dışarıya gerekli state'leri ve fonksiyonları döndürüyor
    return {
        patients,
        fetchPatient,
        loading,
        error,
        saveProduct,
        updateProduct,
        deleteProduct
    };
};

export default useFetchPatient;
