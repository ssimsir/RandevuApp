import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import useBiltekRequest from "../../services/useBiltekRequest";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


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

export default function NewPatientModal({ 
	newPatientModalopen, 
	newPatientModalHandleClose, 
	patientInfo, 
	setPatientInfo,
	fetchPatient}) 
{
	const { postBiltek} = useBiltekRequest()
	
	const handleChange = (e) => {
		setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });

	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(patientInfo)
		if (patientInfo?._id) {
			//? put isteginin
			postBiltek("patients", patientInfo)
		} else {
			//? post firma işlemi
			postBiltek("patients", patientInfo)
		}

		//? modal ı kapıtıyoruz
		newPatientModalHandleClose();
	};

	//console.log(patientInfo);
	return (
		<div>
			<Modal
				open={newPatientModalopen}
				onClose={newPatientModalHandleClose}
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
								value={patientInfo?.name}
								onChange={handleChange}
								required
							/>

							<TextField
								label="Soyad"
								name="surname"
								id="surname"
								type="text"
								variant="outlined"
								value={patientInfo?.surname}
								onChange={handleChange}
								required
							/>
							<FormControl>
                            <InputLabel variant="outlined" id="genderLabel">
                                Cinsiyet
                            </InputLabel>
                            <Select
                                labelId="genderLabel"
                                label="Cinsiyet"
                                name="gender"
                                value={patientInfo?.gender}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem key={1} value={"Female"}>Kadın</MenuItem>
                                <MenuItem key={2} value={"Male"}>Erkek</MenuItem>

                            </Select>
                        </FormControl>

							<TextField
								label="Kimlik No"
								name="idNumber"
								id="idNumber"
								type="number"
								variant="outlined"
								value={patientInfo?.idNumber}
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
								value={patientInfo?.email}
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
								value={patientInfo?.phoneNumber}
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
								value={patientInfo?.companyName}
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
								value={patientInfo?.iban}
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
							value={patientInfo?.address}
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
								value={patientInfo?.taxNumber}
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
								value={patientInfo?.taxOffice}
								onChange={handleChange}
								required
							/>
						</Box>
						<Button variant="contained" type="submit">
							{patientInfo?._id ? "UPDATE FIRM" : "KAYIT"}
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
