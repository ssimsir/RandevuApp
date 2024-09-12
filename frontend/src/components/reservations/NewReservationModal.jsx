import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { useSelector } from "react-redux";
import useAxios from "../../services/useAxios";
import useBiltekRequest from "../../services/useBiltekRequest";
import {parseDateString} from "./dateTimeFormater"
const NewReservationModal = ({
	modalStartTime,
	modalEndTime,
	open,
	setOpen,
	selectInfo,
}) => {
	const { axiosPublic } = useAxios();
   const {getBiltek} = useBiltekRequest();
	const { clients, products, clientsLoading, productsLoading } =
		useSelector((state) => state.biltek);
	const { userId } = useSelector((state) => state.auth);

	const modalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};
	const reservationFormSchema = object({
		startTime: string(),
		endTime: string(),
		client: string().required("Lütfen Danışan Seçiniz"),
		serviceType: string().required("Lütfen Hizmet Seçiniz"),
      aciklama: string(),
	});

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = (values) => {

		const resevation = {
			//reservationId: 0,
			userId: userId,
			description: values.aciklama,
			startTime: parseDateString(values.startTime),
			endTime: parseDateString(values.endTime),
			clientId: values.client,
			productId: values.serviceType,
		}
		console.log(resevation)
		axiosPublic
			.post("/reservations", resevation)
			.then((response) => {
				console.log("İstek başarılı:", response.data);
				const { id, title, start, end, backgroundColor, borderColor } =
					response.data;

				let calendarApi = selectInfo.view.calendar;
				calendarApi.unselect();
				calendarApi.addEvent({
					id,
					title,
					start,
					end,
					backgroundColor,
					borderColor,
					allDay: false,
				}
         );
            getBiltek("reservations");
				handleClose();
			})
			.catch((error) => {
				console.error("Hata:", error);
			});
	};

	return (
		
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={modalStyle}>
				{clientsLoading && productsLoading ? (
					<div>Yükleniyor</div>
				) : (
					<Formik
						initialValues={{
							startTime: "",
							endTime: "",
							client: "",
							serviceType: "",
                     		aciklama:"",
						}}
						validationSchema={reservationFormSchema}
						onSubmit={(values, actions) => {
							actions.resetForm();
							actions.setSubmitting(false);
							handleSave(values);
							console.log(values);
						}}
					>
						{({
							values,
							handleChange,
							handleBlur,
							touched,
							errors,
							isSubmitting,
						}) => (
							<Form>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										gap: 2,
									}}
								>
									<TextField
										id="startTime"
										name="startTime"
										label="Başlangıç Zamanı"
										value={(values.startTime = modalStartTime)}
										InputProps={{
											readOnly: true,
										}}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<TextField
										id="endTime"
										name="endTime"
										label="Bitiş Zamanı"
										value={(values.endTime = modalEndTime)}
										InputProps={{
											readOnly: true,
										}}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<FormControl fullWidth>
										<InputLabel id="clientLabel">Danışan</InputLabel>
										<Select
											labelId="clientLabel"
											id="client"
											name="client"
											value={values.client}
											label="Danışan"
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.client && !!errors.client}
										>
											
											{clients.map((client) => (
												<MenuItem
													key={`client${client._id}`}
													value={client._id}
												>{`${client.name} ${client.surname}`}</MenuItem>
											))}
										</Select>
										{touched.client && errors.client && (
											<Typography color="error">
												{errors.client}
											</Typography>
										)}
									</FormControl>

									<FormControl fullWidth>
										<InputLabel id="serviceTypeLabel">
											Hizmet Türü
										</InputLabel>
										<Select
											labelId="serviceTypeLabel"
											id="serviceType"
											name="serviceType"
											value={values.serviceType}
											label="Hizmet Türü"
											onChange={handleChange}
											onBlur={handleBlur}
											error={
												touched.serviceType && !!errors.serviceType
											}
										>
											{products.map((product) => (
												<MenuItem
													key={`serviceType${product._id}`}
													value={product._id}
												>
													{product.name}
												</MenuItem>
											))}
										</Select>
										{touched.serviceType && errors.serviceType && (
											<Typography color="error">
												{errors.serviceType}
											</Typography>
										)}
									</FormControl>
                                                        
									<TextField
										id="aciklama"
										name="aciklama"
										label="Açıklama"
										value={(values.aciklama)}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<Button
										variant="contained"
										type="submit"
										disabled={isSubmitting}
									>
										Kayıt
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				)}
			</Box>
		</Modal>
	);
};

export default NewReservationModal;
