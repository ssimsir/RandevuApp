import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../../../../styles/globalStyles";
import { Button, TextField } from "@mui/material";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import useAxios from "../../../../services/useAxios"
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const NewPatientAdmissionModal = ({ 
    newPatientAdmissionModalOpen, 
    newPatientAdmissionModalHandleClose , 
    patientAdmissionInfo, 
    setPatientAdmissionInfo,
    fetchPatientAdmissionByPatientId
}) => {

    const { axiosToken } = useAxios()

    const handleChange = (e) => {
        setPatientAdmissionInfo({ ...patientAdmissionInfo, [e.target.name]: e.target.value });
    };

    const savePatientAdmission = async (info) => {
        try {
            const { data } = await axiosToken.post(`/API/v1/patientAdmissions`, info);
            fetchPatientAdmissionByPatientId(info.patientId)
        } catch (error) {
            console.error(error);
        }
    }

    // const editQuotationDetail = async (quotationDetailInfo) => {
    //     try {
    //         const { data: productType } = await axiosToken.put(`/API/v1/quotationDetails/${quotationDetailInfo.id}`, quotationDetailInfo);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        savePatientAdmission(patientAdmissionInfo)

        // if (quotationDetailInfo.id) {

        //     editQuotationDetail(quotationDetailInfo);
        // } else {
        //     saveQuotationDetail(quotationDetailInfo);
        // }
        closeHandle();

    };

    const closeHandle = () => {
        newPatientAdmissionModalHandleClose();
        setPatientAdmissionInfo({
            userId:"",
            patientId :"",
            admissionDate : "",
            doctorId :""
        })
    }


    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
        try {
            const { data } = await axiosToken(`/API/v1/doctors`);
            setDoctors(data.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    return (
        <div>
            <Modal
                open={newPatientAdmissionModalOpen}
                onClose={closeHandle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={closeHandle}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <FormControl>
                            <InputLabel variant="outlined" id="doctorLabel">
                                DOKTOR
                            </InputLabel>
                            <Select
                                labelId="doctorLabel"
                                label="DOKTOR"
                                name="doctorId"
                                value={patientAdmissionInfo?.doctorId}
                                onChange={handleChange}
                                required
                            >
                                {doctors?.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <TextField
                            label="Kayıt Tarihi"
                            id="admissionDate"
                            name="admissionDate"
                            type="date"
                            variant="outlined"
                            value={patientAdmissionInfo?.admissionDate}
                            onChange={handleChange}
                            required
                            InputLabelProps={{
                                shrink: true, // Etiketin her zaman görünmesini sağlar
                            }}
                        />

                        <Button type="submit" variant="contained" size="large">
                            {/* {quotationDetailInfo?.id ? "ÜRÜN GÜNCELLE" : "ÜRÜN EKLE"} */}
                            KAYIT
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default NewPatientAdmissionModal