import React, { useEffect} from "react";
import useBiltekRequest from "../services/useBiltekRequest";
import { Container} from "@mui/material";
import PatientsSearch from "../components/patients/PatientsSearch";

const Patients = () => {
	const { getBiltek } = useBiltekRequest();
	
	useEffect(() => {
		getBiltek("patients");
	}, []);
	return (
		<Container maxWidth="xxl" style={{ marginTop: '1px', height:"91vh", border: "1px solid black" }}>	
			<PatientsSearch/>			
		</Container>
	);
};

export default Patients;
