import { useState } from 'react';
import useAxios from './useAxios';
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
const useFetchPatientAdmission = () => {
    const { axiosToken } = useAxios();

    // State'leri tanımlıyoruz
    const [patientAdmissions, setPatientAdmissions] = useState([]);
    const [patientAdmissionsByPatientId, setPatientAdmissionsByPatientId] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Ürün grubunu getiren fonksiyon
    const fetchPatientAdmission = async () => {
        setLoading(true);
        setError(null); // Önceki hatayı sıfırlıyoruz
        try {
            const { data } = await axiosToken(`/API/v1/patientAdmissions`);
            setPatientAdmissions(data.data); // Gelen verileri state'e kaydediyoruz

        } catch (error) {
            setError('Hata oluşru.');
            console.error(error);
        } finally {
            setLoading(false); // Yükleme durumu bitiyor
        }
    };

    const fetchPatientAdmissionByPatientId = async (patientId) => {
        setLoading(true);
        setError(null); // Önceki hatayı sıfırlıyoruz
        try {
            const { data } = await axiosToken(`/API/v1/patientAdmissions/?filter[patientId]=${patientId}&sort[admissionNumber]=desc`);
            setPatientAdmissionsByPatientId(data.data); // Gelen verileri state'e kaydediyoruz
        } catch (error) {
            setError('Hata oluşru.');
            console.error(error);
        } finally {
            setLoading(false); // Yükleme durumu bitiyor
        }
    };

    const savePatientAdmission = async (patientAdmissions) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosToken.post('/API/v1/patientAdmissions', patientAdmissions);
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
        patientAdmissions,
        fetchPatientAdmission,
        patientAdmissionsByPatientId,
        fetchPatientAdmissionByPatientId,
        savePatientAdmission,
        loading,
        error,
        
        updateProduct,
        deleteProduct
    };
};

export default useFetchPatientAdmission;
