import React, { useEffect, useState } from "react";
import useReservationRequest from "../services/useReservationRequest";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../components/patientAdmission/ResponsiveAppBar";
import PatientDataGrid from "../components/patientAdmission/PatientDataGrid";

const PatientAdmission = () => {

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
	}
	const { userId } = useSelector(state => state.auth)
	const [info, setInfo] = useState({
		clientId: 0,
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
	const { getReservationPatientlists } = useReservationRequest();


	useEffect(() => {
		getReservationPatientlists();
	}, []);

	return (
		<div>
			<Typography variant="h4" color={"error"} mb={2}>
				Hasta Kabul
			</Typography>

			<ResponsiveAppBar/>
			<Box sx={{ display: "flex", gap: 2, marginTop:2 }} >
				<PatientDataGrid sx={{ width: "200px" }} />
				<PatientDataGrid sx={{ width: "500px" }} />
			</Box>

		</div>
	);
};

export default PatientAdmission;
