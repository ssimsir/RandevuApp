import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "../../../../../styles/globalStyles";
import { useEffect, useState } from "react";
import useAxios from "../../../../../services/useAxios";

const NewPatinetAdmissionPaymentModal = ({ 
    newPatinetAdmissionPaymentModalopen,
    newPatinetAdmissionPaymentModalHandleClose,
    newPatinetAdmissionPaymentModalInfo,
    setNewPatinetAdmissionPaymentModalInfo,
    fetchPatinetAdmissionPaymentsData,
    fetchPatinetAdmissionData
})  => {
	
    const { axiosToken} = useAxios()

	const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatinetAdmissionPaymentModalInfo({ ...newPatinetAdmissionPaymentModalInfo, [name]: value });         
	};



    const savePatientAdmissionPayment = async (newPatinetAdmissionPaymentModalInfo) => {
        try {
            const { data } = await axiosToken.post(`/API/v1/patientAdmissionPayments`, newPatinetAdmissionPaymentModalInfo);
            fetchPatinetAdmissionPaymentsData()
            fetchPatinetAdmissionData()
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
		e.preventDefault();
        savePatientAdmissionPayment(newPatinetAdmissionPaymentModalInfo)
		newPatinetAdmissionPaymentModalHandleClose();
	};

	return (
		<div>
			<Modal
				open={newPatinetAdmissionPaymentModalopen}
				onClose={newPatinetAdmissionPaymentModalHandleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <IconButton onClick={newPatinetAdmissionPaymentModalHandleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
					<Box
						sx={{ display: "flex", flexDirection: "column", gap: 2 }}
						component={"form"}
						onSubmit={handleSubmit}
					>	
                        <TextField
							label="Tahsilat Miktarı"
							name="paymentAmount "
							id="paymentAmount "
							type="number"
							variant="outlined"
                            required
							value={newPatinetAdmissionPaymentModalInfo?.paymentAmount  }
							onChange={handleChange}							
						/>			
						<TextField
							label="Uyarı / Açıklama"
							name="infoMessage"
							id="infoMessage"
							type="text"
							multiline
							rows={3}
							variant="outlined"
							value={newPatinetAdmissionPaymentModalInfo?.infoMessage}
							onChange={handleChange}							
						/>				
						<Button variant="contained" type="submit">
							{/* {patientInfo?._id ? "UPDATE FIRM" : "KAYIT"} */}Kayıt
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
export default NewPatinetAdmissionPaymentModal