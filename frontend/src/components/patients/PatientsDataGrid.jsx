import * as React from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

import useBiltekRequest from "../../services/useBiltekRequest";


export default function PatientsDataGrid() {

	const { patients, loading } = useSelector((state) => state.biltek);

	const rows = patients;
	const { deleteBiltek } = useBiltekRequest();
	const deleteUser = React.useCallback(
		(id) => () => {
			setTimeout(() => {

				if (window.confirm("Müşteri silinecektir eminmisiniz")) {
					deleteBiltek("patients", id)
				}
				console.log("delete", id)
				//setRows((prevRows) => prevRows.filter((row) => row.id !== id));
			});
		},
		[deleteBiltek],
	);

	const getRowId = (row) => row._id
	const columns = [
		// {
		// 	field: "patientId",
		// 	hide: true,
		// },
		{
			field: "name",
			headerName: "Adı",
			flex: 1.5,
		},
		{
			field: "surname",
			headerName: "Soyadı",
			flex: 1.5,
		},
		{
			field: "idNumber",
			headerName: "Kimlik No",
			flex: 1,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
		},
		{
			field: "phoneNumber",
			headerName: "Telefon",
			flex: 1,
		},

		{
			field: "companyName",
			headerName: "Firma Adı",
			flex: 1,
		},
		{
			field: 'actions',
			type: 'actions',
			flex: 0.7,
			getActions: (params) => [
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={deleteUser(params.id)}
				/>,

			],
		},
	];

	return (
		<div style={{ height: 400, width: "100%" }}>
			{loading ? (
				<div>Yükleniyor</div>
			) : (
				<DataGrid
					rows={rows}
					columns={columns}
					localeText={{
						toolbarDensity: "Size",
						toolbarDensityLabel: "Size",
						toolbarDensityCompact: "Small",
						toolbarDensityStandard: "Medium",
						toolbarDensityComfortable: "Large",
					}}
					getRowId={getRowId}
					slots={{
						toolbar: GridToolbar,
					}}
				/>
			)}
		</div>
	);
}
