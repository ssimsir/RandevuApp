import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import useBiltekRequest from "../../../services/useBiltekRequest";
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
								sx={textFieldStyle}
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
								label="Adı"
								name="name"
								id="name"
								type="text"
								variant="outlined"
								value={patientInfo?.name}
								onChange={handleChange}
								required
							/>

							<TextField
								sx={textFieldStyle}
								label="Soyadı"
								name="surname"
								id="surname"
								type="text"
								variant="outlined"
								value={patientInfo?.surname}
								onChange={handleChange}
								required
							/>
						</Box>
						<Box sx={boxStyle}>

							<TextField
								sx={textFieldStyle}
								label="Doğum Tarihi"
								name="birthDate"
								id="birthDate"
								type="date"
								variant="outlined"
								value={patientInfo?.birthDate}
								onChange={handleChange}
								InputLabelProps={{
									shrink: true,
								  }}
								required
							/>

							<FormControl sx={textFieldStyle}> 
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
							/>
							<TextField
								sx={textFieldStyle}
								label="GSM (10 Haneli)"
								name="gsmNumber"
								id="gsmNumber"
								type="tel"
								variant="outlined"
								value={patientInfo?.gsmNumber}
								onChange={handleChange}
								required
							/>
						</Box>
						<Box sx={boxStyle}>
							<TextField
								sx={textFieldStyle}
								label="Anne Adı"
								name="motherName"
								id="motherName"
								type="text"
								variant="outlined"
								value={patientInfo?.motherName}
								onChange={handleChange}								
							/>
							<TextField
								sx={textFieldStyle}
								label="Baba Adı"
								name="fatherName"
								id="fatherName"
								type="text"
								variant="outlined"
								value={patientInfo?.fatherName}
								onChange={handleChange}							
							/>
						</Box>
						<TextField
							label="Adres"
							name="address"
							id="address"
							type="text"
							multiline
							rows={3}
							variant="outlined"
							value={patientInfo?.address}
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
							value={patientInfo?.infoMessage}
							onChange={handleChange}							
						/>				
						<Button variant="contained" type="submit">
							{patientInfo?._id ? "UPDATE FIRM" : "KAYIT"}
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
