import React, { useEffect, useState } from "react";
import useBiltekRequest from "../services/useBiltekRequest";
import { Button, Typography } from "@mui/material";
import PatientsDataGrid from "../components/patients/PatientsDataGrid";
import PatientModal from "../components/patients/PatientsModal";
import { useSelector } from "react-redux";

const Patients = () => {
	
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
	 }
	 const {userId} = useSelector(state=> state.auth)
	const [info, setInfo] = useState({
		patientId: 0,
		userId: userId,
		name: "",
		surname: "",
		idNumber: "",
		email: "",
		phoneNumber: "",
		companyName: "",
		iban: "",
		address: "",
		taxNumber: "",
		taxOffice: ""
	})
	const { getBiltek } = useBiltekRequest();


	useEffect(() => {
		getBiltek("patients");
	}, []);

	return (
		<div>
			<Typography variant="h4" color={"error"} mb={2}>
				Müşteriler
			</Typography>
			<Button sx={{marginY:"20px"}} variant="contained" onClick={handleOpen}>YENİ MÜŞTERİ</Button>
			<PatientModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
			<PatientsDataGrid />
		</div>
	);
};

export default Patients;
