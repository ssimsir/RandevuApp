import React, { useEffect, useState } from "react";
import useBiltekRequest from "../services/useBiltekRequest";
import { Button, Typography } from "@mui/material";
import ClientsDataGrid from "../components/clients/ClientsDataGrid";
import ClientModal from "../components/clients/ClientsModal";
import { useSelector } from "react-redux";

const Clients = () => {
	
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
	 }
	 const {userId} = useSelector(state=> state.auth)
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
	const { getBiltek } = useBiltekRequest();


	useEffect(() => {
		getBiltek("clients");
	}, []);

	return (
		<div>
			<Typography variant="h4" color={"error"} mb={2}>
				Müşteriler
			</Typography>
			<Button sx={{marginY:"20px"}} variant="contained" onClick={handleOpen}>YENİ MÜŞTERİ</Button>
			<ClientModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
			<ClientsDataGrid />
		</div>
	);
};

export default Clients;
