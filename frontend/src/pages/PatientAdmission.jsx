import React, { useEffect, useState } from "react";
import useReservationRequest from "../services/useReservationRequest";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../components/patientAdmission/ResponsiveAppBar";
import PatientDataGrid from "../components/patientAdmission/PatientDataGrid";
import PatientDataProcess from "../components/patientAdmission/PatientDataProcess";

const PatientAdmission = () => {


	const { getReservationPatientlists } = useReservationRequest();

	const [patientId, setPatientId] = useState("")
	useEffect(() => {
		getReservationPatientlists();
	}, []);

	return (
		<div>
			<Typography variant="h4" color={"error"} mb={2}>
				Hasta Kabul
			</Typography>

			{/* <ResponsiveAppBar/> */}
			<Box sx={{ display: "flex", gap: 2, marginTop:2 }} >
				{/* <PatientDataGrid sx={{ width: "200px" }} /> */}
				{/* <PatientDataProcess sx={{ width: "500px" }} patientId={patientId} setPatientId = {setPatientId} /> */}
			</Box>

		</div>
	);
};

export default PatientAdmission;
