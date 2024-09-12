import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import useBiltekRequest from "../../services/useBiltekRequest";


const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 750,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const boxStyle = {
	display: "flex",
	gap: 2,
	width: "100%",
	flex: 1,
	justifyContent: "space-between",
};

const textFieldStyle = {
	width: 325,
};

export default function ClientModal({ handleClose, open, info, setInfo }) {
	const { postBiltek} = useBiltekRequest()
	
	const handleChange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });

	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(info)
		if (info?._id) {
			//? put isteginin
			postBiltek("clients", info)
		} else {
			//? post firma işlemi
			postBiltek("clients", info)
		}

		//? modal ı kapıtıyoruz
		handleClose();
	};

	//console.log(info);
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Box
						sx={{ display: "flex", flexDirection: "column", gap: 2 }}
						component={"form"}
						onSubmit={handleSubmit}
					>
						<Box sx={boxStyle}>
							<TextField
								label="Ad"
								name="name"
								id="name"
								type="text"
								variant="outlined"
								value={info?.name}
								onChange={handleChange}
								required
							/>

							<TextField
								label="Soyad"
								name="surname"
								id="surname"
								type="text"
								variant="outlined"
								value={info?.surname}
								onChange={handleChange}
								required
							/>

							<TextField
								label="Kimlik No"
								name="idNumber"
								id="idNumber"
								type="number"
								variant="outlined"
								value={info?.idNumber}
								onChange={handleChange}
								required
							/>
						</Box>
						<Box sx={boxStyle}>
							<TextField
								sx={textFieldStyle}
								label="E-Posta"
								name="email"
								id="email"
								type="email"
								variant="outlined"
								value={info?.email}
								onChange={handleChange}
								required
							/>

							<TextField
								sx={textFieldStyle}
								label="Telefon"
								name="phoneNumber"
								id="phoneNumber"
								type="tel"
								variant="outlined"
								value={info?.phoneNumber}
								onChange={handleChange}
								required
							/>
						</Box>

						<Box sx={boxStyle}>
							<TextField
								sx={textFieldStyle}
								label="Firma Adı"
								name="companyName"
								id="companyName"
								type="text"
								variant="outlined"
								value={info?.companyName}
								onChange={handleChange}
								required
							/>

							<TextField
								sx={textFieldStyle}
								label="IBAN"
								name="iban"
								id="iban"
								type="text"
								variant="outlined"
								value={info?.iban}
								onChange={handleChange}
								required
							/>
						</Box>
						<TextField
							label="Adres"
							name="address"
							id="address"
							type="text"
							variant="outlined"
							value={info?.address}
							onChange={handleChange}
							required
						/>
						<Box sx={boxStyle}>
							<TextField
								sx={textFieldStyle}
								label="Vergi No"
								name="taxNumber"
								id="taxNumber"
								type="number"
								variant="outlined"
								value={info?.taxNumber}
								onChange={handleChange}
								required
							/>
							<TextField
								sx={textFieldStyle}
								label="Vergi Dairesi"
								name="taxOffice"
								id="taxOffice"
								type="text"
								variant="outlined"
								value={info?.taxOffice}
								onChange={handleChange}
								required
							/>
						</Box>
						<Button variant="contained" type="submit">
							{info?._id ? "UPDATE FIRM" : "KAYIT"}
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
