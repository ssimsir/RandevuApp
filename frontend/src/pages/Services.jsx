

import React, { useEffect, useState } from "react";
import useBiltekRequest from "../services/useBiltekRequest";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ServicesModal from "../components/services/ServicesModal";
import ServicesDataGrid from "../components/services/ServicesDataGrid";

const Services = () => {
	
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
	 }
	 const {userId} = useSelector(state=> state.auth)
	const [info, setInfo] = useState({
		serviceId:0,
		userId: userId,
		name: "",
		content: "",
		code: "",
		barcode: "",
		quantity: "",
		price: "",
		color: ""
	})
	const { getBiltek } = useBiltekRequest();


	useEffect(() => {
		getBiltek("services");
	}, []);

	return (
		<div>
			<Typography variant="h4" color={"error"} mb={2}>
				Hizmetler
			</Typography>
			<Button sx={{marginY:"20px"}} variant="contained" onClick={handleOpen}>YENİ HİZMET</Button>
			<ServicesModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
			<ServicesDataGrid />
		</div>
	);
};

export default Services;

