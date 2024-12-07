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

// const boxStyle = {
// 	display: "flex",
// 	gap: 2,
// 	width: "100%",
// 	flex: 1,
// 	justifyContent: "space-between",
// };

// const textFieldStyle = {
// 	width: 325,
// };

export default function ServicesModal({ handleClose, open, info, setInfo }) {
	const { postBiltek} = useBiltekRequest()
	
	const handleChange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });

	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(info)
		if (info?._id) {
			//? put isteginin
			postBiltek("services", info)
		} else {
			//? post firma işlemi
			postBiltek("services", info)
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
	
							<TextField
								label="Hizmet Adı"
								name="name"
								id="name"
								type="text"
								variant="outlined"
								value={info?.name}
								onChange={handleChange}
								required
							/>

							<TextField
								label="Hizmet İçeriği"
								name="content"
								id="content"
								type="text"
								variant="outlined"
								value={info?.content}
								onChange={handleChange}
								required
							/>

							<TextField
								label="Hizmet Kodu"
								name="code"
								id="code"
								type="number"
								variant="outlined"
								value={info?.code}
								onChange={handleChange}
								required
							/>

							<TextField
								label="Hizmet Fiyatı (KDV Hariç)"
								name="price"
								id="price"
								type="number"
								variant="outlined"
								value={info?.price}
								onChange={handleChange}
								required
							/>
							<TextField
								label="Renk Seçici"
								name="color"
								id="color"
								type="color"
								value={info?.color || "#000000"} 
								onChange={handleChange}
								InputProps={{ inputProps: { style: { fontSize: 30 } } }} // İsteğe bağlı: renk seçici boyutunu ayarlayabilirsiniz
								/>
						<Button variant="contained" type="submit">
							{info?._id ? "GÜNCELLE" : "KAYIT"}
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
