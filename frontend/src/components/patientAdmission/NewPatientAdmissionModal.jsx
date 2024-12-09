import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../../styles/globalStyles";
import { Button } from "@mui/material";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import useAxios from "../../services/useAxios"
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const NewPatientAdmissionModal = ({ newPatientAdmissionModalOpen, newPatientAdmissionModalCloseHandle /*, quotationDetailInfo, setQuotationDetailInfo */}) => {

    const { axiosToken} = useAxios()

    const [examinationType, setExaminationType] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "examinationType"){
            setExaminationType(value);
        }        
    };

    // const saveQuotationDetail = async (quotationDetailInfo) => {
    //     try {
    //         const { data: productType } = await axiosToken.post(`/API/v1/quotationDetails`, quotationDetailInfo);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const editQuotationDetail = async (quotationDetailInfo) => {
    //     try {
    //         const { data: productType } = await axiosToken.put(`/API/v1/quotationDetails/${quotationDetailInfo.id}`, quotationDetailInfo);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (quotationDetailInfo.id) {
            
        //     editQuotationDetail(quotationDetailInfo);
        // } else {
        //     saveQuotationDetail(quotationDetailInfo);
        // }
        closeHandle();
        
    };

    const closeHandle  = () => {
        newPatientAdmissionModalCloseHandle();
        //setGroupSelectValue('');
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
                            <InputLabel variant="outlined" id="examinationType">
                                MUAYENE TÜRÜ
                            </InputLabel>
                            <Select
                                labelId="examinationType"
                                label="MUAYENE TÜRÜ"
                                name="examinationType"
                                value={examinationType || ""}
                                onChange={handleChange}
                                required
                            >
                                 <MenuItem key={0} value={""}></MenuItem>
                                <MenuItem key={1} value={"Genel Muayene"}>Genel Muayene</MenuItem>
                                <MenuItem key={2} value={"Seans"}>Seans</MenuItem>
      
                            </Select>
                        </FormControl>
{/* 
                        <TextField
                            label="İSKONTO"
                            id="discount"
                            name="discount"
                            type="number"
                            variant="outlined"
                            value={quotationDetailInfo?.discount || ""}
                            onChange={handleChange}
                            required
                        /> */}

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