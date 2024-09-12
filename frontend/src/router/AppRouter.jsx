import {Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Reservations from "../pages/Reservations";
import Home from "../pages/Home";
import Clients from "../pages/Clients";
import Products from "../pages/Products";

const AppRouter = () => {
	return (

			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="app/biltek" element={<PrivateRouter />}>
					<Route path="" element={<Dashboard />}>
						<Route index element={<Home />} />
						<Route path="clients" element={<Clients />} />
						<Route path="reservations" element={<Reservations />} />
						<Route path="products" element={<Products />} />
					</Route>
				</Route>
			</Routes>
	);
};

export default AppRouter;
