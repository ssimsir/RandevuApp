import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "../../../../../styles/globalStyles";
import { useEffect, useState } from "react";
import useAxios from "../../../../../services/useAxios";

const NewPatinetAdmissionServiceModal = ({ 
    newPatinetAdmissionServiceModalopen,
    newPatinetAdmissionServiceModalHandleClose,
    newPatinetAdmissionServiceModalInfo,
    setNewPatinetAdmissionServiceModalInfo,
    fetchPatinetAdmissionServicesData,
    fetchPatinetAdmissionData
})  => {
	
    const { axiosToken} = useAxios()

	const handleChange = (e) => {
        const { name, value } = e.target;
        if (name==='serviceId'){
            const [selectedService] = services.filter((item)=>item._id===value)
            setNewPatinetAdmissionServiceModalInfo({ ...newPatinetAdmissionServiceModalInfo, ["serviceId"]: selectedService._id, ["price"]:selectedService.price });
        } else if (name==='discount' && value==="") {
            setNewPatinetAdmissionServiceModalInfo({ ...newPatinetAdmissionServiceModalInfo, [name]: 0 });
        } 
        else {
            setNewPatinetAdmissionServiceModalInfo({ ...newPatinetAdmissionServiceModalInfo, [name]: value });
        }          
	};

    const [services, setServices] = useState([]);
    const fetchServices = async () => {
        try {
            const { data } = await axiosToken(`/API/v1/services`);
            setServices(data.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchServices();

    }, []);


    const savePatientAdmissionService = async (newPatinetAdmissionServiceModalInfo) => {
        try {
            const { data } = await axiosToken.post(`/API/v1/patientAdmissionServices`, newPatinetAdmissionServiceModalInfo);
            fetchPatinetAdmissionServicesData()
            fetchPatinetAdmissionData()
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
		e.preventDefault();
        savePatientAdmissionService(newPatinetAdmissionServiceModalInfo)
		newPatinetAdmissionServiceModalHandleClose();
	};

	return (
		<div>
			<Modal
				open={newPatinetAdmissionServiceModalopen}
				onClose={newPatinetAdmissionServiceModalHandleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <IconButton onClick={newPatinetAdmissionServiceModalHandleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
					<Box
						sx={{ display: "flex", flexDirection: "column", gap: 2 }}
						component={"form"}
						onSubmit={handleSubmit}
					>
		
                        <FormControl>
                            <InputLabel variant="outlined" id="serviceLabel">
                                HİZMET
                            </InputLabel>
                            <Select
                                labelId="serviceLabel"
                                label="HİZMET"
                                name="serviceId"
                                value={newPatinetAdmissionServiceModalInfo?.serviceId}
                                onChange={handleChange}
                                required
                            >
                                {services?.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>		
                        <TextField
							label="İskonto"
							name="discount"
							id="discount"
							type="number"
							variant="outlined"
							value={newPatinetAdmissionServiceModalInfo?.discount }
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
							value={newPatinetAdmissionServiceModalInfo?.infoMessage}
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
export default NewPatinetAdmissionServiceModal