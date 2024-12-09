

import React, { useEffect, useState } from "react";
import useBiltekRequest from "../services/useBiltekRequest";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductsModal from "../components/products/ProductsModal";
import ProductsDataGrid from "../components/products/ProductsDataGrid";

const ProductServices = () => {
	
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
	 }
	 const {userId} = useSelector(state=> state.auth)
	const [info, setInfo] = useState({
		productServicesId:0,
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
		getBiltek("products");
	}, []);

	return (
		<div>
			<Typography variant="h4" color={"error"} mb={2}>
				Ürün ve Hizmetler
			</Typography>
			<Button sx={{marginY:"20px"}} variant="contained" onClick={handleOpen}>YENİ ÜRÜN VE HİZMET</Button>
			<ProductsModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
			<ProductsDataGrid />
		</div>
	);
};

export default ProductServices;

