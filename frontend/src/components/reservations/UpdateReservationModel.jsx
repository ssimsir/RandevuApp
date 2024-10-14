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
import { useEffect, useState } from "react";

const UpdateReservationModel = ({ reservationId, open, setOpen }) => {
	const { axiosPublic } = useAxios();
	const { getBiltek } = useBiltekRequest();
	const { clients, products, clientsLoading, productsLoading } =
		useSelector((state) => state.biltek);

	const initialState = {
		startTime: "",
		endTime: "",
		clientId: "",
		productId: "",
		description: "",
	};
	const [reservationInfo, setReservationInfo] = useState(initialState);

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
		clientId: string().required("Lütfen Danışan Seçiniz"),
		productId: string().required("Lütfen Hizmet Seçiniz"),
		description: string(),
	});

	const handleClose = () => {
		setOpen(false);
	};

	const getReservationById = async () => {
		try {
			const response = await axiosPublic(`/API/v1/reservations/${reservationId}`);
			const { startTime, endTime, clientId, productId, description } =
				response.data.data;
			setReservationInfo({
				startTime,
				endTime,
				clientId,
				productId,
				description,
			});
		} catch (error) {
			console.error("Reservation fetch error:", error);
		}
	};

	useEffect(() => {
		if (reservationId !== 0) {
			getReservationById();
		}
	}, [reservationId]);

	const handleSave = (values) => {
		axiosPublic
			.put(`/API/v1/reservations/${reservationId}`, {
				description: values.description,
				clientId: values.clientId,
				productId: values.productId,
			})
			.then((response) => {
				console.log("İstek başarılı:", response.data);
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
				{clientsLoading || productsLoading ? (
					<div>Yükleniyor</div>
				) : (
					<>
						<Box sx={{ display: "flex", mb: "30px", gap: "1rem" }}>
							<Button variant="contained" color="success">
								İşlem Tamamlandı
							</Button>
							<Button variant="contained" color="error">
								Randevu İptal
							</Button>
						</Box>
						{reservationInfo && (
							<Formik
								enableReinitialize
								initialValues={reservationInfo}
								validationSchema={reservationFormSchema}
								onSubmit={(values, actions) => {
									handleSave(values);
									actions.resetForm();
									actions.setSubmitting(false);
								}}
							>
								{({
									values,
									handleChange,
									handleBlur,
									touched,
									errors,
									isSubmitting,
									setFieldValue,
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
												value={
													values.startTime
														? new Date(values.startTime).toLocaleString("tr-TR")
														: ""
												}
												InputProps={{
													readOnly: true,
												}}
												onBlur={handleBlur}
											/>
											<TextField
												id="endTime"
												name="endTime"
												label="Bitiş Zamanı"
												value={
													values.endTime
														? new Date(values.endTime).toLocaleString("tr-TR")
														: ""
												}
												InputProps={{
													readOnly: true,
												}}
												onBlur={handleBlur}
											/>
											<FormControl fullWidth>
												<InputLabel id="clientLabel">Danışan</InputLabel>
												<Select
													labelId="clientLabel"
													id="clientId"
													name="clientId"
													value={values.clientId}
													label="Danışan"
													onChange={(e) =>
														setFieldValue("clientId", e.target.value)
													}
													onBlur={handleBlur}
													error={touched.clientId && !!errors.clientId}
												>
													{clients.map((client) => (
														<MenuItem
															key={`client${client._id}`}
															value={client._id}
														>{`${client.name} ${client.surname}`}</MenuItem>
													))}
												</Select>
												{touched.clientId && errors.clientId && (
													<Typography color="error">
														{errors.clientId}
													</Typography>
												)}
											</FormControl>

											<FormControl fullWidth>
												<InputLabel id="serviceTypeLabel">Hizmet Türü</InputLabel>
												<Select
													labelId="serviceTypeLabel"
													id="productId"
													name="productId"
													value={values.productId}
													label="Hizmet Türü"
													onChange={(e) =>
														setFieldValue("productId", e.target.value)
													}
													onBlur={handleBlur}
													error={touched.productId && !!errors.productId}
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
												{touched.productId && errors.productId && (
													<Typography color="error">
														{errors.productId}
													</Typography>
												)}
											</FormControl>

											<TextField
												id="description"
												name="description"
												label="Açıklama"
												value={values.description}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											<Button
												variant="contained"
												type="submit"
												disabled={isSubmitting}
											>
												Güncelle
											</Button>
										</Box>
									</Form>
								)}
							</Formik>
						)}
					</>
				)}
			</Box>
		</Modal>
	);
};

export default UpdateReservationModel;
