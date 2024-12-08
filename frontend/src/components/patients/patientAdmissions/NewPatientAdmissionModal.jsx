import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../../../styles/globalStyles";
import { Button, TextField } from "@mui/material";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import useAxios from "../../../services/useAxios"
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const NewPatientAdmissionModal = ({ newPatientAdmissionModalOpen, newPatientAdmissionModalHandleClose , patientAdmissionInfo, setPatientAdmissionInfo }) => {

    const { axiosToken } = useAxios()

    const handleChange = (e) => {
        console.log(patientAdmissionInfo);
        setPatientAdmissionInfo({ ...patientAdmissionInfo, [e.target.name]: e.target.value });
    };

    const savePatientAdmission = async (info) => {
        console.log(info);
        try {
            const { data: productType } = await axiosToken.post(`/API/v1/patientAdmissions`, info);
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
            ...patientAdmissionInfo,
            admissionDate : new Date().toISOString().split("T")[0],
            doctorId :""
        })
    }

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
                                label="Doktor"
                                name="doctorId"
                                value={patientAdmissionInfo.doctorId}
                                onChange={handleChange}
                                required
                            >
                                
                                <MenuItem key={1} value={"1"}>Doktor1</MenuItem>
                                <MenuItem key={2} value={"2"}>Doktor2</MenuItem>

                            </Select>
                        </FormControl>

                        <TextField
                            label="Kayıt Tarihi"
                            id="admissionDate"
                            name="admissionDate"
                            type="date"
                            variant="outlined"
                            value={patientAdmissionInfo.admissionDate}
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