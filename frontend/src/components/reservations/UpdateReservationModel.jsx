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
import { dateTimeToString } from "./dateTimeFormater";

const UpdateReservationModel = ({
	reservationId,
	open,
	setOpen,
	selectInfo,
}) => {
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
	const getReservationById = () => {
		 axiosPublic(`/reservations/${reservationId}`).then((response) => {
			  const { start, end, clientId, productId, description } = response.data;
			  setReservationInfo({
					startTime: start,
					endTime: end,
					clientId,
					productId,
					description,
			  });
		 });
	};

	useEffect(() => {
		 if (reservationId !== 0) {
			  getReservationById();
		 }
	}, [reservationId]);

	const handleSave = (values) => {
		 console.log("values", values);
		 axiosPublic
			  .put(`/reservations/${reservationId}`, {
					description: values.description,
					//startTime: new Date(values.startTime),
					//endTime: new Date(values.endTime), 
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
					{console.log(clients)}
					{console.log(products)}
					{clientsLoading && productsLoading ? (
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
							  <Formik
									enableReinitialize
									initialValues={reservationInfo}
									validationSchema={reservationFormSchema}
									onSubmit={(values, actions) => {
										 handleSave(values);
										 actions.resetForm();
										 actions.setSubmitting(false);
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
														 value={dateTimeToString(new Date(reservationInfo.startTime))}
														 InputProps={{
															  readOnly: true,
														 }}
														 onBlur={handleBlur}
													/>
													<TextField
														 id="endTime"
														 name="endTime"
														 label="Bitiş Zamanı"
														 value={dateTimeToString(new Date(values.endTime))}
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
																		 key={`client${client.clientId}`}
																		 value={client.clientId}
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
														 <InputLabel id="serviceTypeLabel">
															  Hizmet Türü
														 </InputLabel>
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
															  error={
																	touched.productId &&
																	!!errors.productId
															  }
														 >
															  {products.map((product) => (
																	<MenuItem
																		 key={`serviceType${product.productId}`}
																		 value={product.productId}
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
						 </>
					)}
			  </Box>
		 </Modal>
	);
};

export default UpdateReservationModel;
