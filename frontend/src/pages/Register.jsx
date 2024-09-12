import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useAuthRequest from "../services/useAuthRequest";

const Register = () => {
	const navigate = useNavigate();
	const { register } = useAuthRequest();
	const registerSchema = object({
		userName: string().required("Kullanıcı Adı Zorunludur"),
		firstName: string().required("Ad Zorunludur"),
		lastName: string().required("Soyad Zorunludur"),
		email: string()
			.email("Geçerli bir email giriniz")
			.required("Email zorunludur"),
		password: string()
			.required("Şifre zorunludur")
			.min(8, "Şifre en az 8 karakter olmalıdır")
			.max(16, "Şifre en fazla 16 karakter olmalıdır")
			.matches(/\d+/, "Şifre en az bir rakam içermelidir.")
			.matches(/[a-z]+/, "Şifre en az bir küçük harf içermelidir.")
			.matches(/[A-Z]+/, "Şifre en az bir büyük harf içermelidir.")
			.matches(
				/[@$!%*?&]+/,
				"Şifre en az bir özel karakter(@$!%*?&) içermelidir."
			),
	});
	return (
		<Container maxWidth="lg">
			<Grid
				container
				justifyContent="center"
				direction="row-reverse"
				rowSpacing={{ sm: 3 }}
				sx={{
					height: "100vh",
					p: 2,
				}}
			>
				<Grid item xs={12}>
					<Typography variant="h3" color="primary" align="center">
						STOCK APP
					</Typography>
				</Grid>

				<Grid item xs={12} sm={10} md={6}>
					<Avatar
						sx={{
							backgroundColor: "secondary.light",
							m: "auto",
							width: 40,
							height: 40,
						}}
					>
						<LockIcon size="30" />
					</Avatar>
					<Typography
						variant="h4"
						align="center"
						mb={2}
						color="secondary.light"
					>
						Register
					</Typography>
					<Formik
						initialValues={{
							userName: "",
							firstName: "",
							lastName: "",
							email: "",
							password: "",
						}}
						validationSchema={registerSchema}
						onSubmit={(values, actions) => {
							//TODO
							//? POST (Login)
							register(values);
							//? Toastify
							//? Global state güncellenmesi
							//? form resetleme
							actions.resetForm();
							actions.setSubmitting(false); //? isSubmitting
							//? navigate
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
										label="User Name"
										name="userName"
										id="userName"
										type="text"
										variant="outlined"
										value={values.userName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={
											touched.userName && Boolean(errors.userName)
										}
										helperText={touched.userName && errors.userName}
									/>
									<TextField
										label="First Name"
										name="firstName"
										id="firstName"
										type="text"
										variant="outlined"
										value={values.firstName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={
											touched.firstName && Boolean(errors.firstName)
										}
										helperText={touched.firstName && errors.firstName}
									/>
									<TextField
										label="Last Name"
										name="lastName"
										id="lastName"
										type="text"
										variant="outlined"
										value={values.lastName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={
											touched.lastName && Boolean(errors.lastName)
										}
										helperText={touched.lastName && errors.lastName}
									/>
									<TextField
										label="Email"
										name="email"
										id="email"
										type="email"
										variant="outlined"
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && errors.email}
									/>
									<TextField
										label="password"
										name="password"
										id="password"
										type="password"
										variant="outlined"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										error={
											touched.password && Boolean(errors.password)
										}
										helperText={touched.password && errors.password}
									/>
									<Button
										type="submit"
										variant="contained"
										disabled={isSubmitting}
									>
										Submit
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
					<Box sx={{ textAlign: "center", mt: 2 }}>
						<Link to="/">Do you have an account?</Link>
					</Box>
				</Grid>

				<Grid item xs={0} sm={7} md={6}>
					<Container>
						<img src={image} alt="" />
					</Container>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Register;
