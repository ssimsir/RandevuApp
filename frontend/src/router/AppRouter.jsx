import {Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Reservations from "../pages/Reservations";
import Home from "../pages/Home";
import Patients from "../pages/Patients";
import Services from "../pages/Services";
import PatientAdmission from "../pages/PatientAdmission";

const AppRouter = () => {
	return (

			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="app/biltek" element={<PrivateRouter />}>
					<Route path="" element={<Dashboard />}>
						<Route index element={<Home />} />
						<Route path="patients" element={<Patients />} />
						<Route path="reservations" element={<Reservations />} />
						<Route path="services" element={<Services />} />
						<Route path="patientAdmission" element={<PatientAdmission />} />
					</Route>
				</Route>
			</Routes>
	);
};

export default AppRouter;
